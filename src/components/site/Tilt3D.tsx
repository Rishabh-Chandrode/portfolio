'use client';

import { PointerEvent, ReactNode, useRef } from 'react';

/**
 * Pointer-driven 3D tilt container. The wrapper keeps `transform-style:
 * preserve-3d`, so children marked with the `depth` class lift toward the
 * viewer. A glare overlay tracks the cursor via the --mx/--my CSS vars.
 * Transforms are written straight to the node, so moves never re-render.
 * Disabled for touch and reduced-motion users (handled in CSS / guards).
 */
export default function Tilt3D({
	children,
	className,
	max = 9,
	scale = 1.02,
	glare = true,
}: {
	children: ReactNode;
	className?: string;
	max?: number;
	scale?: number;
	glare?: boolean;
}) {
	const ref = useRef<HTMLDivElement>(null);

	function onPointerMove(event: PointerEvent<HTMLDivElement>) {
		const node = ref.current;
		if (!node || event.pointerType !== 'mouse') return;
		const rect = node.getBoundingClientRect();
		const px = (event.clientX - rect.left) / rect.width;
		const py = (event.clientY - rect.top) / rect.height;
		node.style.transition = 'transform 0.08s ease-out';
		node.style.transform = `perspective(1000px) rotateX(${((0.5 - py) * max).toFixed(2)}deg) rotateY(${((px - 0.5) * max).toFixed(2)}deg) scale(${scale})`;
		node.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
		node.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
	}

	function onPointerLeave() {
		const node = ref.current;
		if (!node) return;
		node.style.transition = '';
		node.style.transform = 'perspective(1000px)';
	}

	return (
		<div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className={`tilt3d ${className ?? ''}`}>
			{children}
			{glare && (
				<div aria-hidden="true" className="tilt3d-glare pointer-events-none absolute inset-0 rounded-[inherit]" />
			)}
		</div>
	);
}
