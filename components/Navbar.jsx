import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/images/MNFTlogo.png';
import RegularButton from './RegularButton';
import Web3Modal from 'web3modal';
import useweb3store from '../store/web3store';
import { getProviderOrSigner } from '../store/util';

export default function Navbar() {
	const web3ModalRef = useRef();
	const [walletConnected, setWalletConnected] = useState(false);
	const { address, addAddress, addweb3Modal } = useweb3store((state) => ({
		address: state.address,
		addAddress: state.addAddress,
		addweb3Modal: state.addweb3Modal,
	}));

	const connectWallet = async () => {
		try {
			const signer = await getProviderOrSigner(web3ModalRef, true);
			const _address = await signer.getAddress();
			addAddress(_address);
			setWalletConnected(true);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!walletConnected) {
			addweb3Modal(web3ModalRef);
			web3ModalRef.current = new Web3Modal({
				network: 'matic',
				providerOptions: {},
				disableInjectedProvider: false,
			});
			connectWallet();
		}
	}, [walletConnected]);

	return (
		<nav className='flex px-7 py-3 justify-between'>
			<Image src={logo} width={100} height={100} alt='Logo' />
			<div className='flex justify-evenly items-center w-2/3 lg:w-1/3 self-center text-white'>
				<p>
					<Link href='/marketplace'>Marketplace</Link>
				</p>

				<p>
					<Link href='/create'>Create</Link>
				</p>

				<p>{walletConnected && <Link href='/profile'>My NFTs</Link>}</p>

				{walletConnected ? (
					<p className='py-1 px-2 border border-current rounded-2xl shadow-sm shadow-slate-300	'>
						{address.slice(0, 5) + '...' + address.slice(-4)}
					</p>
				) : (
					<RegularButton
						clickFunction={connectWallet}
						text={'Connect Wallet'}
					/>
				)}
			</div>
		</nav>
	);
}
