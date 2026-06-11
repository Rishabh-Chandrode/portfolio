'use client';

import { useEffect, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#';

/** Types text in with a brief character-scramble, terminal style. */
export default function Decode({ text }: { text: string }) {
	const [output, setOutput] = useState(text);

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
	}, [text]);

	return <span aria-label={text}>{output}</span>;
}
