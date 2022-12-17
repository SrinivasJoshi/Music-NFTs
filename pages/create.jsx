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
	const [musicUrl, setMusicUrl] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [loadingState, setLoadingState] = useState('Upload');
	const [loader, setLoader] = useState(false);

	//web3 state
	const { web3modalRef } = useweb3store((state) => ({
		web3modalRef: state.web3Modal,
	}));

	const uploadFileToIpfs = async (e, isMusic) => {
		setLoader(true);
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

			const Hash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
			console.log(Hash);
			if (isMusic) {
				setMusicUrl(Hash);
			} else {
				setImageUrl(Hash);
			}
		} catch (error) {
			console.log('Error uploading file to IPFS : ', error?.data.message);
		}
		setLoader(false);
	};

	const mintNft = async (e) => {
		e.preventDefault();
		//make json data
		if (!albumName || !price || !imageUrl || !musicUrl) return;
		const data = JSON.stringify({
			name: albumName,
			image: imageUrl,
			music: musicUrl,
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

			finalJson = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
			console.log('Final Json : ', finalJson);
		} catch (error) {
			console.log('Error uploading json to IPFS : ', error);
		}

		setLoadingState('Minting your NFT!');
		setLoader(true);
		try {
			const signer = await getProviderOrSigner(web3modalRef, true);
			const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
			const _price = utils.parseEther(price);
			const tx = await nftContract.mintToken(finalJson, amount, _price);
			await tx.wait();
			setLoadingState('Done!');
			setLoader(false);
			Router.push('/marketplace');
		} catch (error) {
			console.log('Unable to mint NFT : ', error);
			setLoader(false);
		}
	};

	return (
		<div className='bg-bgBlue min-h-screen px-1 md:px-12'>
			<Navbar />
			<h1 className='mb-12 text-center text-transparent text-2xl md:text-3xl bg-rainbow bg-clip-text font-display'>
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
							disabled={loader || musicUrl.length !== 0}
							className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2.5'
							id='file_input2'
							accept='.mp3,audio/*'
							type='file'
							required
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
							disabled={loader || imageUrl.length !== 0}
							className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2.5'
							id='file_input1'
							accept='image/*'
							type='file'
							required
						/>
					</div>
				</div>
				<button
					type='submit'
					className='bg-lightBlue w-fit px-3 py-2 text-white font-sans rounded-3xl self-center my-5'>
					{loadingState}
				</button>
			</form>
			{loader && (
				<div role='status' className='flex justify-center'>
					<svg
						aria-hidden='true'
						class='mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
						viewBox='0 0 100 101'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
							fill='currentColor'
						/>
						<path
							d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
							fill='currentFill'
						/>
					</svg>
					<span class='sr-only'>Loading...</span>
				</div>
			)}
		</div>
	);
}
