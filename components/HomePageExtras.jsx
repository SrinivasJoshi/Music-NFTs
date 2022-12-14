import React from 'react';
import Bookmark from '../public/images/Bookmark.png';
import Upload from '../public/images/Paper-Upload.png';
import Wallet from '../public/images/Wallet.png';
import Image from 'next/image';

export default function () {
	return (
		<div className='bg-bgBlue h-screen text-white flex flex-col items-center justify-evenly'>
			<h1 className='text-transparent text-4xl bg-rainbow bg-clip-text font-display'>
				Create and sell your NFTs
			</h1>
			<div className='flex items-center justify-evenly px-5'>
				<div className='flex flex-col items-center justify-evenly'>
					<Image src={Wallet} width={40} height={40} alt='Wallet Icon' />
					<h2 className='text-2xl font-semibold my-5'>Set up your wallet</h2>
					<p className='text-sm text-center w-3/4'>
						Once you’ve set up your wallet of choice, connect it to OpenSea by
						clicking the wallet icon in the top right corner. Learn about the
						wallets we support.
					</p>
				</div>

				<div className='flex flex-col items-center justify-evenly'>
					<Image src={Upload} width={40} height={40} alt='Uplaod Icon' />
					<h2 className='text-2xl font-semibold my-5'>
						Upload & Create Collection
					</h2>
					<p className='text-sm text-center w-3/4'>
						Upload your work then Click My Collections and set up your
						collection. Add social links, a description, profile & banner
						images, and set a secondary sales fee.
					</p>
				</div>

				<div className='flex flex-col items-center justify-evenly'>
					<Image src={Bookmark} width={40} height={40} alt='Sale Icon' />
					<h2 className='text-2xl font-semibold my-5'>List them for sale</h2>
					<p className='text-sm text-center w-3/4'>
						Choose between auctions, fixed-price listings, and declining-price
						listings. You choose how you want to sell your NFTs, and we help you
						sell them
					</p>
				</div>
			</div>
		</div>
	);
}
