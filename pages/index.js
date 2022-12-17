import Navbar from '../components/Navbar';
import RegularButton from '../components/RegularButton';
import StrokeButton from '../components/StrokeButton';
import newHomeImage from '../public/images/newHomeImage.svg';
import Image from 'next/image';
import Link from 'next/link';
import HomePageExtras from '../components/HomePageExtras';

export default function Home() {
	return (
		<div className='bg-bgBlue min-h-screen'>
			<Navbar />
			<main className='flex flex-col-reverse md:flex-row justify-between items-center text-white overflow-y-hidden px-6 md:px-12'>
				<div className='w-full md:w-4/6'>
					<h1 className='px-5 md:px-0 text-3xl md:text-7xl bg-clip-text font-display bg-rainbow text-transparent my-0 md:my-10'>
						Discover collect, & sell Extraordinary NFTs
					</h1>
					<p className='px-5 md:px-0 my-6 md:my-10 w-full md:w-4/5'>
						The leading NFT Marketplace on EthereumHome to the next generation
						of digital creators.Discover the best NFT collections.
					</p>
					<div className='px-5 md:px-0 w-4/5 md:w-3/12 flex justify-between'>
						<Link href='/marketplace'>
							<RegularButton text={'Explore'} />
						</Link>
						<StrokeButton>
							<Link href='/create'>Create</Link>
						</StrokeButton>
					</div>

					<div className='w-full mt-8 flex justify-evenly md:justify-between text-white md:w-1/2'>
						<div className='flex flex-col items-center'>
							<p className='font-display text-lg'>432K</p>
							<p className='text-gray-300'>+Collections</p>
						</div>

						<div className='flex flex-col items-center'>
							<p className='font-display text-lg'>200K</p>
							<p className='text-gray-300'>+Artists</p>
						</div>

						<div className='flex flex-col items-center'>
							<p className='font-display text-lg'>10K</p>
							<p className='text-gray-300'>+Community</p>
						</div>
					</div>
				</div>
				<Image
					src={newHomeImage}
					alt='Home page image'
					className='w-full md:w-2/5'
				/>
			</main>
			<HomePageExtras />
		</div>
	);
}
