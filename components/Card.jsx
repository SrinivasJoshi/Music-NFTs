import React from 'react';
import Image from 'next/image';
import trialImage from '../public/images/dhundla.jpeg';

export default function Card() {
	return (
		<div className='text-white p-3 rounded-lg flex flex-col items-center border border-white w-66 min-h-80'>
			<Image src={trialImage} className='rounded-lg' width={300} height={300} />
			<div className='flex flex-col items-center w-full'>
				<p className='font-bold text-xl self-center my-4'>Dhundhala</p>
				<div className='grid grid-cols-2 w-full justify-between'>
					<p className='text-sm text-gray-400 font-thin'>Creator : _YashRaj</p>
					<p className='text-sm text-right text-gray-400 font-thin'>
						Language : Hindi
					</p>
					<p className='text-sm  text-gray-400 font-thin'>Type : Pop</p>
					<p className='text-sm text-right text-gray-400 font-thin'>
						Remaining : 1000
					</p>
				</div>
				<p className='my-4'>
					Price :{' '}
					<span class='inline-block bg-transparent border border-white rounded-full px-3 py-1 text-sm font-semibold text-white'>
						0.01 ETH
					</span>
				</p>
			</div>
			<button className='bg-lightBlue px-6 py-1 text-white font-sans rounded-3xl'>
				Buy NFT
			</button>
		</div>
	);
}
