'use client';

import { ReactNode, useEffect, useRef } from 'react';

/** Drifts and fades the hero content as the page scrolls away from it. */
export default function Parallax({ children }: { children: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const y = window.scrollY;
				if (y > window.innerHeight) return; // hero is off-screen
				node.style.transform = `translateY(${(y * 0.22).toFixed(1)}px)`;
				node.style.opacity = `${Math.max(0, 1 - y / (window.innerHeight * 0.85)).toFixed(3)}`;
			});
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => {
			window.removeEventListener('scroll', update);
			cancelAnimationFrame(frame);
		};
	}, []);

	return <div ref={ref}>{children}</div>;
}
