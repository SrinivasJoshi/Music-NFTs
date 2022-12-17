import Card1 from '../components/Card1';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { getProviderOrSigner } from '../store/util';
import { Contract } from 'ethers';
import { abi, NFT_CONTRACT_ADDRESS } from '../constants';
import useweb3store from '../store/web3store';

export default function Marketplace() {
	const [marketItems, setMarketItems] = useState([]);
	const { web3modalRef } = useweb3store((state) => ({
		web3modalRef: state.web3Modal,
	}));

	const getMarketItems = async () => {
		try {
			const provider = await getProviderOrSigner(web3modalRef, false);
			const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
			const _marketItems = await nftContract.fetchMarketItems();
			setMarketItems(_marketItems);
			console.log(_marketItems);
		} catch (error) {
			console.log('Error fetching market Items NFTs : ', error);
		}
	};

	useEffect(() => {
		getMarketItems();
	}, []);
	return (
		<div className='bg-bgBlue min-h-screen px-8 md:px-12'>
			<Navbar />

			<h1 className='mb-12 text-center text-transparent text-2xl md:text-4xl bg-rainbow bg-clip-text font-display'>
				Marketplace
			</h1>
			{marketItems.length === 0 && (
				<p className='mt-5 text-white text-center'>No MNFTs in market yet!</p>
			)}
			<div className='grid gap-8 pb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
				{marketItems.map((nft) => {
					return <Card1 nft={nft} key={nft.tokenId} />;
				})}
			</div>
		</div>
	);
}
