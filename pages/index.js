import Navbar from '../components/Navbar';
import RegularButton from '../components/RegularButton';
import StrokeButton from '../components/StrokeButton';
import newHomeImage from '../public/images/newHomeImage.svg';
import Image from 'next/image';
import Link from 'next/link';
import HomePageExtras from '../components/HomePageExtras';

export default function Home() {
	return (
		<div className='bg-bgBlue h-screen '>
			<Navbar />
			<main className='flex justify-between items-center text-white overflow-y-hidden px-12'>
				<div className='w-4/6'>
					<h1 className='text-7xl bg-clip-text font-display bg-rainbow text-transparent my-10'>
						Discover collect, & sell Extraordinary NFTs
					</h1>
					<p className='my-10 w-4/5'>
						The leading NFT Marketplace on EthereumHome to the next generation
						of digital creators.Discover the best NFT collections.
					</p>
					<div className='w-3/12 flex justify-between'>
						<Link href='/marketplace'>
							<RegularButton text={'Explore'} />
						</Link>
						<StrokeButton>
							<Link href='/create'>Create</Link>
						</StrokeButton>
					</div>

					<div className='mt-8 flex justify-between text-white w-1/2'>
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
				<Image src={newHomeImage} alt='Home page image' className='w-2/5' />
			</main>
			<HomePageExtras />
		</div>
	);
}
