'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

/**
 * Fades content in on first scroll into view. Renders visible immediately
 * if IntersectionObserver is unavailable or JS is disabled long enough.
 */
export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node || typeof IntersectionObserver === 'undefined') {
			setVisible(true);
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			style={{ transitionDelay: `${delay}ms` }}
			className={`transition-all duration-700 motion-reduce:transition-none ${
				visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
			}`}
		>
			{children}
		</div>
	);
}
