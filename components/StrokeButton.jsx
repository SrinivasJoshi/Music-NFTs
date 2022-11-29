export default function StrokeButton({ children }) {
	return (
		<button className='border border-white text-white px-4 py-2 rounded-3xl font-sans'>
			{children}
		</button>
	);
}
