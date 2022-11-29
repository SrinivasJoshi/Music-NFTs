import React from 'react';
import Card from '../components/Card';

export default function Marketplace() {
	return (
		<div className='bg-bgBlue min-h-screen px-12 py-12'>
			<h1 className='mb-12 text-center text-transparent text-4xl bg-rainbow bg-clip-text font-display'>
				Marketplace
			</h1>
			<div className='grid gap-8 mb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</div>
	);
}
