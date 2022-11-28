/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				// prettier-ignore
				'bgBlue': '#151843',
				// prettier-ignore
				'lightBlue': '#2F80ED',
			},
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
				display: ['ClashDisplay'],
			},
		},
		backgroundImage: {
			rainbow: 'linear-gradient(90deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);',
		},
	},
	plugins: [],
};
