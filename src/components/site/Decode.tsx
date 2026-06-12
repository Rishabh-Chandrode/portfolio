'use client';

import { useEffect, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#';

/**
 * Types text in with a brief character-scramble, terminal style.
 * Runs once `active` becomes true (immediately by default).
 */
export default function Decode({ text, active = true }: { text: string; active?: boolean }) {
	const [output, setOutput] = useState(text);

	useEffect(() => {
		if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let frame = 0;
		let tick = 0;
		const settle = 2.2; // ticks per character before it locks in

		const step = () => {
			tick += 1;
			const settled = Math.floor(tick / settle);
			if (settled >= text.length) {
				setOutput(text);
				return;
			}
			setOutput(
				text
					.split('')
					.map((char, i) => {
						if (i < settled || char === ' ') return char;
						return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
					})
					.join(''),
			);
			frame = requestAnimationFrame(step);
		};
		frame = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frame);
	}, [text, active]);

	return <span aria-label={text}>{output}</span>;
}
