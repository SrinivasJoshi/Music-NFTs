import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProviderOrSigner } from '../store/util';
import { Contract, ethers } from 'ethers';
import { abi, NFT_CONTRACT_ADDRESS } from '../constants';
import useweb3store from '../store/web3store';
import { Router } from 'next/router';

export default function Card1({ nft }) {
	const [nftData, setNftData] = useState({});
	const [loading, setLoading] = useState('Buy NFT');
	const { web3modalRef } = useweb3store((state) => ({
		web3modalRef: state.web3Modal,
	}));

	const getNftData = async () => {
		const res = await fetch(nft.tokenUri);
		const data = await res.json();
		setNftData(data);
		if (nft.amount.toNumber() === 0) {
			setLoading('Sold Out!');
		}
	};
	useEffect(() => {
		getNftData();
	}, []);

	// CHANGE HERE
	const createMarketSale = async () => {
		try {
			setLoading('Buying NFT');
			const signer = await getProviderOrSigner(web3modalRef, true);
			const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
			const tx = await nftContract.createMarketSale(nft.tokenId, {
				value: nft.price,
			});
			await tx.wait();
			setLoading('Done!');
			Router.push('/profile');
		} catch (error) {
			alert('You already own this NFT');
			setLoading('Owned');
			console.log('Unable to create market sale', { error });
		}
	};

	return (
		<div className='text-white p-3 rounded-lg flex flex-col items-center border border-white w-66 min-h-80'>
			<Image
				src={nftData.image ? nftData.image : ''}
				className='rounded-lg'
				width={300}
				height={300}
				alt='NFT Image'
			/>
			<div className='flex flex-col items-center w-full'>
				<p className='font-bold text-xl self-center my-4'>{nftData.name}</p>
				<div className='grid grid-cols-2 w-full justify-between'>
					<p className='text-sm text-gray-400 font-thin'>
						Creator : {nftData.creatorName}{' '}
					</p>
					<p className='text-sm text-right text-gray-400 font-thin'>
						Language : {nftData.language}
					</p>
					<p className='text-sm  text-gray-400 font-thin'>
						Type : {nftData.typeofSong}
					</p>
					<p className='text-sm text-right text-gray-400 font-thin'>
						Remaining : {nft.amount.toNumber()}
					</p>
				</div>
				<p className='my-4'>
					Price :{' '}
					<span className='inline-block bg-transparent border border-white rounded-full px-3 py-1 text-sm font-semibold text-white'>
						{ethers.utils.formatEther(nft.price)} MATIC
					</span>
				</p>
			</div>
			<button
				className='bg-lightBlue px-6 py-1 text-white font-sans rounded-3xl'
				onClick={createMarketSale}
				disabled={nft.amount.toNumber() === 0}>
				{loading}
			</button>
		</div>
	);
}
