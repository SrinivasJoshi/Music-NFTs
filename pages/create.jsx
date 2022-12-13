import { useState } from 'react';
import { Contract, utils } from 'ethers';
import { abi, NFT_CONTRACT_ADDRESS } from '../constants';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { getProviderOrSigner } from '../store/util';
import Router from 'next/router';
import useweb3store from '../store/web3store';

export default function Create() {
	//form state
	const [albumName, setAlbumName] = useState('');
	const [creatorName, setCreatorName] = useState('');
	const [typeofSong, setTypeofSong] = useState('');
	const [language, setLanguage] = useState('');
	const [amount, setAmount] = useState('');
	const [price, setPrice] = useState('');
	const [musicUrl, setMusicUrl] = useState(
		'ipfs://QmZea8jgGgSuwog2BkSuStMaggruact7iA7Do6G6qUz5cs'
	);
	const [imageUrl, setImageUrl] = useState('');
	const [loadingState, setLoadingState] = useState('Upload');

	//web3 state
	const { web3modalRef } = useweb3store((state) => ({
		web3modalRef: state.web3Modal,
	}));

	const uploadFileToIpfs = async (e, isMusic) => {
		const file = e.target.files[0];
		try {
			const formData = new FormData();
			formData.append('file', file);
			const resFile = await axios({
				method: 'post',
				url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
				data: formData,
				headers: {
					pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
					pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
					'Content-Type': 'multipart/form-data',
				},
			});

			const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
			console.log(ImgHash);
			if (isMusic) {
				setMusicUrl(ImgHash);
			} else {
				setImageUrl(ImgHash);
			}
		} catch (error) {
			console.log('Error uploading file to IPFS : ', error);
		}
	};

	const mintNft = async (e) => {
		e.preventDefault();
		//make json data
		if (!albumName || !price || !imageUrl || !musicUrl) return;
		const data = JSON.stringify({
			name: albumName,
			image: imageUrl,
			description: '...',
			creatorName,
			language,
			typeofSong,
		});

		setLoadingState('Uploading data to IPFS!');
		let finalJson;
		try {
			const resFile = await axios({
				method: 'post',
				url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
				data,
				headers: {
					pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
					pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
					'Content-Type': 'application/json',
				},
			});

			finalJson = `ipfs://${resFile.data.IpfsHash}`;
			console.log('Final Json : ', finalJson);
		} catch (error) {
			console.log('Error uploading json to IPFS : ', error);
		}

		setLoadingState('Minting your NFT!');
		try {
			const signer = await getProviderOrSigner(web3modalRef, true);
			const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
			const _price = utils.parseEther(price);
			const tx = await nftContract.mintToken(finalJson, amount, _price);
			await tx.wait();
			setLoadingState('Done! - proce');
			Router.push('/profile');
		} catch (error) {
			console.log('Unable to mint NFT : ', error);
		}
	};

	return (
		<div className='bg-bgBlue min-h-screen px-12'>
			<Navbar />
			<h1 className='mb-12 text-center text-transparent text-4xl bg-rainbow bg-clip-text font-display'>
				Create Your NFT
			</h1>
			<form className='px-12 flex flex-col' onSubmit={mintNft}>
				<div className='grid gap-6 mb-6 md:grid-cols-2'>
					<div>
						<label
							htmlFor='album_name'
							className='block mb-2 text-sm font-medium text-white dark:text-white'>
							Album name
						</label>
						<input
							type='text'
							value={albumName}
							onChange={(e) => setAlbumName(e.target.value)}
							id='album_name'
							className='outline-none bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Dhundhala'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='creator-name'
							className='block mb-2 text-sm font-medium text-white dark:text-white'>
							Creator name
						</label>
						<input
							type='text'
							value={creatorName}
							onChange={(e) => setCreatorName(e.target.value)}
							id='creator-name'
							className='outline-none bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Yashraj'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='mood'
							className='block mb-2 text-sm font-medium text-white dark:text-white'>
							Type of song
						</label>
						<input
							value={typeofSong}
							onChange={(e) => setTypeofSong(e.target.value)}
							type='text'
							id='mood'
							className='outline-none bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Pop'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='language'
							className='block mb-2 text-sm font-medium text-white dark:text-white'>
							Language(if any)
						</label>
						<input
							value={language}
							onChange={(e) => setLanguage(e.target.value)}
							type='text'
							id='language'
							className='outline-none bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Hindi'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='amount'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
							Amount of NFTs to mint
						</label>
						<input
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							type='number'
							id='amount'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='100'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='price'
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
							Price of one NFT(MATIC)
						</label>
						<input
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							type='number'
							id='price'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='0.01 MATIC'
							required
							min={0.000001}
							step={0.000001}
						/>
					</div>
					<div>
						<label
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							htmlFor='file_input2'>
							Upload music file(.mp3)
						</label>
						<input
							onChange={(e) => uploadFileToIpfs(e, true)}
							disabled={musicUrl.length !== 0}
							className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2.5'
							id='file_input2'
							accept='.mp3,audio/*'
							type='file'
						/>
					</div>
					<div>
						<label
							className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							htmlFor='file_input1'>
							Upload thumbnail For album
						</label>
						<input
							onChange={(e) => uploadFileToIpfs(e, false)}
							disabled={imageUrl.length !== 0}
							className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2.5'
							id='file_input1'
							accept='image/*'
							type='file'
						/>
					</div>
				</div>
				<button
					type='submit'
					className='bg-lightBlue px-3 py-2 text-white font-sans rounded-3xl w-1/6 self-center my-5'>
					{loadingState}
				</button>
			</form>
		</div>
	);
}
