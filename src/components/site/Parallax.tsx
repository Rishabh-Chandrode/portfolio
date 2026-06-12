'use client';

import { ReactNode, useEffect, useRef } from 'react';

/**
 * Apple-style hero exit: as the page scrolls, the hero content drifts down
 * slightly, scales away and softly blurs out.
 */
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
				const progress = Math.min(1, y / (window.innerHeight * 0.85));
				node.style.transform = `translateY(${(y * 0.22).toFixed(1)}px) scale(${(1 - progress * 0.06).toFixed(4)})`;
				node.style.opacity = `${(1 - progress).toFixed(3)}`;
				node.style.filter = progress > 0.02 ? `blur(${(progress * 5).toFixed(2)}px)` : '';
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
