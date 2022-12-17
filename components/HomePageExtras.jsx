import React from 'react';
import Bookmark from '../public/images/Bookmark.png';
import Upload from '../public/images/Paper-Upload.png';
import Wallet from '../public/images/Wallet.png';
import Image from 'next/image';

export default function () {
	return (
		<div className='bg-bgBlue min-h-screen text-white flex flex-col items-center justify-evenly'>
			<h1 className='text-transparent text-2xl md:text-4xl bg-rainbow bg-clip-text font-display my-6 md:my-0'>
				Create and sell your NFTs
			</h1>
			<div className='flex flex-col md:flex-row items-center justify-evenly px-5'>
				<div className='flex flex-col items-center justify-evenly'>
					<Image
						src={Wallet}
						width={40}
						height={40}
						alt='Wallet Icon'
						className='w-8 h-8'
					/>
					<h2 className='text-xl md:text-2xl font-semibold my-3 md:my-5'>
						Set up your wallet
					</h2>
					<p className='text-sm text-center w-3/4'>
						Once you’ve set up your wallet of choice, connect it to OpenSea by
						clicking the wallet icon in the top right corner. Learn about the
						wallets we support.
					</p>
				</div>

				<div className='my-8 md:my-0 flex flex-col items-center justify-evenly'>
					<Image
						src={Upload}
						width={40}
						height={40}
						alt='Uplaod Icon'
						className='w-8 h-8'
					/>
					<h2 className='text-xl md:text-2xl font-semibold my-3 md:my-5'>
						Upload & Create Collection
					</h2>
					<p className='text-sm text-center w-3/4'>
						Upload your work then Click My Collections and set up your
						collection. Add social links, a description, profile & banner
						images, and set a secondary sales fee.
					</p>
				</div>

				<div className='mb-5 md:mb-0 flex flex-col items-center justify-evenly'>
					<Image
						src={Bookmark}
						width={40}
						height={40}
						alt='Sale Icon'
						className='w-8 h-8'
					/>
					<h2 className='text-xl md:text-2xl font-semibold my-3 md:my-5'>
						List them for sale
					</h2>
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
