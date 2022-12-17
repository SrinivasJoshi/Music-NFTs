import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ethers } from 'ethers';

export default function Card2({ nft }) {
	const [nftData, setNftData] = useState({});
	const getNftData = async () => {
		const res = await fetch(nft.tokenUri);
		const data = await res.json();
		setNftData(data);
	};
	useEffect(() => {
		getNftData();
	}, []);
	return (
		<div className='text-white p-3 rounded-lg flex flex-col justify-evenly items-center border border-white w-66 min-h-80'>
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
						Creator : {nftData.creatorName}
					</p>
					<p className='text-sm text-right text-gray-400 font-thin'>
						Language : {nftData.language}
					</p>
					<p className='text-sm  text-gray-400 font-thin'>
						Type : {nftData.typeofSong}
					</p>
					<p className='text-sm text-right text-gray-400 font-thin'>
						Price : {ethers.utils.formatEther(nft.price)} MATIC
					</p>
				</div>
			</div>
			<audio
				controls
				className='mt-4 w-4/5 h-10 md:h-6'
				src={nftData.music}></audio>
		</div>
	);
}
