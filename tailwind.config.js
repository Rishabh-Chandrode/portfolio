/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
				mono: ['var(--font-mono)', 'monospace'],
			},
			colors: {
				surface: '#0b0e14',
				panel: '#11151d',
				line: '#212836',
				accent: {
					DEFAULT: '#4cc38a',
					dim: '#1b3b2b',
				},
			},
		},
	},
	plugins: [],
};
