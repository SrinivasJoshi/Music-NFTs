import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/images/MNFTlogo.png';
import RegularButton from './RegularButton';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
	const { address, isConnected } = useAccount();
	const { connect } = useConnect({
		connector: new InjectedConnector(),
	});
	const { disconnect } = useDisconnect();
	return (
		<nav className='flex px-7 py-3 justify-between'>
			<Image src={logo} width={100} height={100} alt='Logo' />
			<div className='flex justify-evenly items-center w-1/3 self-center text-white'>
				<p>
					<Link href='/marketplace'>Marketplace</Link>
				</p>

				<p>
					<Link href='/create'>Create</Link>
				</p>
				{isConnected ? 'address' : <ConnectButton />}
			</div>
		</nav>
	);
}
