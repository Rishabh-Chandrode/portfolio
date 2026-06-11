'use client';

import { PointerEvent, ReactNode, useRef } from 'react';

const PULL = 0.25;

/** Nudges its child toward the cursor while hovered, springs back on leave. */
export default function Magnetic({ children }: { children: ReactNode }) {
	const ref = useRef<HTMLSpanElement>(null);

	function onPointerMove(event: PointerEvent<HTMLSpanElement>) {
		const node = ref.current;
		if (!node || event.pointerType !== 'mouse') return;
		const rect = node.getBoundingClientRect();
		const x = (event.clientX - rect.left - rect.width / 2) * PULL;
		const y = (event.clientY - rect.top - rect.height / 2) * PULL;
		node.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
	}

	function onPointerLeave() {
		if (ref.current) ref.current.style.transform = '';
	}

	return (
		<span
			ref={ref}
			onPointerMove={onPointerMove}
			onPointerLeave={onPointerLeave}
			className="inline-block transition-transform duration-200 ease-out motion-reduce:transform-none"
		>
			{children}
		</span>
	);
}
