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
	keywords: [
		'Rishabh Chandrode',
		'Software Engineer',
		'Full Stack Developer',
		'Web Development',
		'React',
		'Next.js',
		'Node.js',
		'TypeScript',
		'Internshala',
	],
	authors: [{ name: 'Rishabh Chandrode', url: 'https://rishabhchandrode.com' }],
	creator: 'Rishabh Chandrode',
	alternates: {
		canonical: 'https://rishabhchandrode.com',
	},
	openGraph: {
		title: 'Rishabh Chandrode — Software Engineer',
		description:
			'Software engineer building reliable web systems — full-stack development, performance work, and developer tooling.',
		url: 'https://rishabhchandrode.com',
		siteName: 'Rishabh Chandrode',
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Rishabh Chandrode — Software Engineer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Rishabh Chandrode — Software Engineer',
		description:
			'Software engineer building reliable web systems — full-stack development, performance work, and developer tooling.',
		images: ['/og-image.png'],
		creator: '@rishabhchandrode',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: [
			{ url: '/icons8-r-16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/icons8-r-32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/icons8-r-96.png', sizes: '96x96', type: 'image/png' },
		],
		apple: [{ url: '/icons8-r-96.png', sizes: '96x96', type: 'image/png' }],
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${jetbrainsMono.variable}`}>
			<body>{children}</body>
		</html>
	);
}
