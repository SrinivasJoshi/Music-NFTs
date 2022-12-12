import { useState, useEffect } from 'react';
import { getProviderOrSigner } from '../store/util';
import { Contract } from 'ethers';
import { abi, NFT_CONTRACT_ADDRESS } from '../constants';

export default function Profile() {
	const [myNFTs, setMyNFTs] = useState([]);
	const [listedNFTs, setListedNFTs] = useState([]);
	const { web3modalRef } = useweb3store((state) => ({
		web3modalRef: state.web3Modal,
	}));

	const getMyNfts = async () => {
		try {
			const provider = getProviderOrSigner(web3modalRef, false);
			const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
			const _myNfts = await nftContract.fetchMyNFTs();
			setMyNFTs(_myNfts);
		} catch (error) {
			console.log('Error fetching your NFTs : ', error);
		}
	};
	const getMyListedNfts = async () => {
		try {
			const provider = getProviderOrSigner(web3modalRef, false);
			const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
			const _listedNfts = await nftContract.fetchItemsListed();
			setListedNFTs(_listedNfts);
		} catch (error) {
			console.log('Error fetching your NFTs : ', error);
		}
	};
	const createMarketItem = async () => {};

	useEffect(() => {
		getMyNfts();
		getMyListedNfts();
	}, []);
	return <div>Profile Page</div>;
}
