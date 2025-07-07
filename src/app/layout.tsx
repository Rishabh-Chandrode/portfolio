import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
	title: 'Rishabh Chandrode',
	description: 'Rishabh Chandrode Portfolio',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
