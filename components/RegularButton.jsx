export default function RegularButton(props) {
	return (
		<button
			onClick={props.clickFunction}
			className='bg-lightBlue px-4 py-2 text-white font-sans rounded-3xl'>
			{props.text}
		</button>
	);
}
