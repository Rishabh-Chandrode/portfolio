'use client';

import { useEffect, useRef } from 'react';

const FOLLOW = 0.18;
const SCALE = 0.15;

/**
 * Trailing cursor ring that eases after the pointer and grows over
 * interactive elements. Skipped on touch devices and for reduced motion.
 */
export default function Cursor() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = ref.current;
		if (
			!node ||
			window.matchMedia('(pointer: coarse)').matches ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			return;
		}

		let targetX = -100;
		let targetY = -100;
		let x = targetX;
		let y = targetY;
		let targetScale = 1;
		let scale = 1;
		let frame = 0;

		const onMove = (event: PointerEvent) => {
			targetX = event.clientX;
			targetY = event.clientY;
			node.style.opacity = '1';
			const interactive = (event.target as Element | null)?.closest?.('a, button, [role="button"]');
			targetScale = interactive ? 1.8 : 1;
		};
		const onLeave = () => {
			node.style.opacity = '0';
		};

		const loop = () => {
			x += (targetX - x) * FOLLOW;
			y += (targetY - y) * FOLLOW;
			scale += (targetScale - scale) * SCALE;
			node.style.transform = `translate(${(x - 16).toFixed(1)}px, ${(y - 16).toFixed(1)}px) scale(${scale.toFixed(3)})`;
			frame = requestAnimationFrame(loop);
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		document.documentElement.addEventListener('pointerleave', onLeave);
		frame = requestAnimationFrame(loop);

		return () => {
			window.removeEventListener('pointermove', onMove);
			document.documentElement.removeEventListener('pointerleave', onLeave);
			cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<div
			ref={ref}
			aria-hidden="true"
			className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-8 w-8 rounded-full border border-accent/50 opacity-0 transition-opacity duration-300 md:block"
		/>
	);
}
