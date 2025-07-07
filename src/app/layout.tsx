import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
	title: "Rishabh Chandrode",
	description: "Rishabh Chandrode Portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<meta
				name="google-site-verification"
				content="7HB1HRnTETWZ6K_maXAeU7t6lGhXvdQXx6B4eW8ByzI"
			/>
			<body>{children}</body>
		</html>
	);
}
