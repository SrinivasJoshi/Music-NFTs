import { useState, useEffect } from 'react';
import { getProviderOrSigner } from '../store/util';
import { Contract } from 'ethers';
import { abi, NFT_CONTRACT_ADDRESS } from '../constants';
import useweb3store from '../store/web3store';
import Navbar from '../components/Navbar';
import Card2 from '../components/Card2';

export default function Profile() {
	const [isSection1, setIsSection1] = useState(true);
	const [myNFTs, setMyNFTs] = useState([]);
	const [listedNFTs, setListedNFTs] = useState([]);
	const { web3modalRef } = useweb3store((state) => ({
		web3modalRef: state.web3Modal,
	}));

	const getMyNfts = async () => {
		try {
			const signer = await getProviderOrSigner(web3modalRef, true);
			const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
			const _myNfts = await nftContract.fetchMyNFTs();
			setMyNFTs(_myNfts);
			console.log(_myNfts);
		} catch (error) {
			console.log('Error fetching your NFTs : ', error);
		}
	};
	const getMyListedNfts = async () => {
		try {
			const signer = await getProviderOrSigner(web3modalRef, true);
			const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
			const _listedNfts = await nftContract.fetchItemsListed();
			setListedNFTs(_listedNfts);
			console.log(_listedNfts);
		} catch (error) {
			console.log('Error fetching your listed NFTs : ', error);
		}
	};

	const changeSection = () => {
		if (isSection1) {
			setIsSection1(false);
		} else {
			setIsSection1(true);
		}
	};

	const loopNFT = (nfts) => {
		return (
			<div className='grid gap-8 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
				{nfts.map((nft) => {
					return <Card2 nft={nft} key={nft.tokenId} />;
				})}
			</div>
		);
	};

	useEffect(() => {
		getMyNfts();
		getMyListedNfts();
	}, []);
	return (
		<div className='bg-bgBlue min-h-screen px-6 md:px-12'>
			<Navbar />
			<main className='flex flex-col items-center'>
				<h1 className='mb-8 text-center text-transparent text-2xl md:text-4xl bg-rainbow bg-clip-text font-display'>
					Profile
				</h1>
				<div className='flex justify-center text-white w-4/5'>
					<button
						className={`w-1/2 pb-2 ${
							isSection1 ? 'border-b-2 border-white' : ''
						}`}
						onClick={changeSection}>
						Your NFTs
					</button>
					<button
						className={`w-1/2 pb-2 ${
							!isSection1 ? 'border-b-2 border-white' : ''
						}`}
						onClick={changeSection}>
						Listed NFTs
					</button>
				</div>

				{isSection1 ? (
					myNFTs.length == 0 ? (
						<p className='mt-10 text-white'>You don't own any MNFTs yet!</p>
					) : (
						loopNFT(myNFTs)
					)
				) : listedNFTs.length == 0 ? (
					<p className='mt-10 text-white'>You haven't listed any MNFTs yet!</p>
				) : (
					loopNFT(listedNFTs)
				)}
			</main>
		</div>
	);
}
