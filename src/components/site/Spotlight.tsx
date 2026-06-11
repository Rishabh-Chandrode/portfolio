'use client';

import { useEffect, useRef } from 'react';

/** Soft accent glow that trails the cursor. Skipped on touch devices. */
export default function Spotlight() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node || window.matchMedia('(pointer: coarse)').matches) return;

		let frame = 0;
		const onMove = (event: PointerEvent) => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				node.style.background = `radial-gradient(560px at ${event.clientX}px ${event.clientY}px, rgba(76, 195, 138, 0.06), transparent 80%)`;
			});
		};
		window.addEventListener('pointermove', onMove, { passive: true });
		return () => {
			window.removeEventListener('pointermove', onMove);
			cancelAnimationFrame(frame);
		};
	}, []);

	return <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-30" />;
}
