import React from 'react';

export default function Create() {
	return (
		<div className='bg-bgBlue min-h-screen px-12 py-12'>
			<h1 className='mb-12 text-center text-transparent text-4xl bg-rainbow bg-clip-text font-display'>
				Create Your NFT
			</h1>
			<form className='px-12 flex flex-col'>
				<div className='grid gap-6 mb-6 md:grid-cols-2'>
					<div>
						<label
							for='album_name'
							className='block mb-2 text-sm font-medium text-white dark:text-white'>
							Album name
						</label>
						<input
							type='text'
							id='album_name'
							className='outline-none bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Dhundhala'
							required
						/>
					</div>
					<div>
						<label
							for='creator-name'
							className='block mb-2 text-sm font-medium text-white dark:text-white'>
							Creator name
						</label>
						<input
							type='text'
							id='creator-name'
							className='outline-none bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Yashraj'
							required
						/>
					</div>
					<div>
						<label
							for='mood'
							className='block mb-2 text-sm font-medium text-white dark:text-white'>
							Type of song
						</label>
						<input
							type='text'
							id='mood'
							className='outline-none bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Pop'
							required
						/>
					</div>
					<div>
						<label
							for='language'
							className='block mb-2 text-sm font-medium text-white dark:text-white'>
							Language(if any)
						</label>
						<input
							type='text'
							id='language'
							className='outline-none bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Pop'
							required
						/>
					</div>
					<div>
						<label
							for='amount'
							class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
							Amount of NFTs to mint
						</label>
						<input
							type='number'
							id='amount'
							class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='100'
							required
						/>
					</div>
					<div>
						<label
							for='price'
							class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
							Price of one NFT(ETH)
						</label>
						<input
							type='number'
							id='price'
							class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='0.01 ETH'
							required
							min={0.0001}
						/>
					</div>
					<div>
						<label
							class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							for='file_input1'>
							Upload thumbnail for album
						</label>
						<input
							class='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2.5'
							id='file_input1'
							accept='image/*'
							type='file'
						/>
					</div>
					<div>
						<label
							class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							for='file_input2'>
							Upload music file(.mp3)
						</label>
						<input
							class='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2.5'
							id='file_input2'
							accept='.mp3,audio/*'
							type='file'
						/>
					</div>
				</div>
				<button
					type='submit'
					className='bg-lightBlue px-3 py-2 text-white font-sans rounded-3xl w-1/6 self-center my-5'>
					Upload
				</button>
			</form>
		</div>
	);
}
