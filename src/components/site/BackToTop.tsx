'use client';

import { useEffect, useState } from 'react';

/** Floating back-to-top button, appears after the first screenful. */
export default function BackToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 600);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<button
			type="button"
			aria-label="Back to top"
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			className={`fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel/80 text-accent backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 ${
				visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
			}`}
		>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
				<path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</button>
	);
}
