'use client';

import { useEffect, useRef } from 'react';

/**
 * Apple-style scroll narration: words start dim and light up one by one as
 * the block moves up through the viewport.
 */
export default function HighlightText({ paragraphs }: { paragraphs: string[] }) {
	const ref = useRef<HTMLDivElement>(null);
	const lastLit = useRef(-1);

	useEffect(() => {
		const container = ref.current;
		if (!container) return;
		const words = Array.from(container.querySelectorAll<HTMLElement>('[data-word]'));

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			words.forEach((word) => word.classList.add('lit'));
			return;
		}

		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const rect = container.getBoundingClientRect();
				const viewport = window.innerHeight;
				// 0 when the block enters near the bottom, 1 a bit past the middle.
				const progress = Math.min(1, Math.max(0, (viewport * 0.85 - rect.top) / (rect.height + viewport * 0.35)));
				const lit = Math.round(progress * words.length);
				if (lit === lastLit.current) return;
				lastLit.current = lit;
				words.forEach((word, index) => word.classList.toggle('lit', index < lit));
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
		<div ref={ref} className="space-y-5 text-lg font-medium leading-relaxed tracking-tight">
			{paragraphs.map((paragraph) => (
				<p key={paragraph.slice(0, 40)}>
					{paragraph.split(' ').map((word, index) => (
						<span
							key={index}
							data-word
							className="text-zinc-600 transition-colors duration-300 [&.lit]:text-zinc-100"
						>
							{word}{' '}
						</span>
					))}
				</p>
			))}
		</div>
	);
}
