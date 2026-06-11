'use client';

import { PointerEvent, ReactNode, useRef } from 'react';

const MAX_TILT_X = 5;
const MAX_TILT_Y = 7;

/**
 * Tilts its children toward the cursor and drives the .tilt-glare highlight.
 * Styles are mutated directly so pointer moves never trigger re-renders.
 */
export default function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
	const ref = useRef<HTMLDivElement>(null);

	function onPointerMove(event: PointerEvent<HTMLDivElement>) {
		const node = ref.current;
		if (!node || event.pointerType !== 'mouse') return;
		const rect = node.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width;
		const y = (event.clientY - rect.top) / rect.height;
		node.style.transform = `perspective(800px) rotateX(${((0.5 - y) * MAX_TILT_X).toFixed(2)}deg) rotateY(${((x - 0.5) * MAX_TILT_Y).toFixed(2)}deg)`;
		node.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
		node.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);
	}

	function onPointerLeave() {
		if (ref.current) ref.current.style.transform = '';
	}

	return (
		<div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className={`tilt ${className ?? ''}`}>
			{children}
		</div>
	);
}
