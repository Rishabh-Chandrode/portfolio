import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
	metadataBase: new URL('https://rishabhchandrode.com'),
	title: {
		default: 'Rishabh Chandrode — Software Engineer',
		template: '%s — Rishabh Chandrode',
	},
	description:
		'Software engineer building reliable web systems — full-stack development, performance work, and developer tooling.',
	openGraph: {
		title: 'Rishabh Chandrode — Software Engineer',
		description: 'Software engineer building reliable web systems.',
		type: 'website',
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${jetbrainsMono.variable}`}>
			<body>{children}</body>
		</html>
	);
}
