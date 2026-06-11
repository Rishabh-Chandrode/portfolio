'use client';

import { useEffect, useRef } from 'react';

/** Thin accent bar along the top edge tracking scroll position. */
export default function ScrollProgress() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const max = document.documentElement.scrollHeight - window.innerHeight;
				node.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
			});
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
			cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-0.5">
			<div ref={ref} className="h-full origin-left scale-x-0 bg-accent" />
		</div>
	);
}
