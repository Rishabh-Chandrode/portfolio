'use client';

import { MouseEvent, useRef } from 'react';
import { Social } from '@/lib/content';
import SocialIcon from '@/components/site/SocialIcon';

const RANGE = 110;
const MAX_SCALE = 0.4;
const MAX_LIFT = 9;

/** macOS-dock style icon row: icons magnify as the cursor approaches. */
export default function Dock({ socials }: { socials: Social[] }) {
	const refs = useRef<(HTMLAnchorElement | null)[]>([]);

	function onMouseMove(event: MouseEvent<HTMLDivElement>) {
		for (const link of refs.current) {
			if (!link) continue;
			const rect = link.getBoundingClientRect();
			const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
			const factor = Math.max(0, 1 - distance / RANGE);
			link.style.transform = `translateY(${(-MAX_LIFT * factor).toFixed(1)}px) scale(${(1 + MAX_SCALE * factor).toFixed(3)})`;
		}
	}

	function onMouseLeave() {
		for (const link of refs.current) {
			if (link) link.style.transform = '';
		}
	}

	return (
		<div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="flex items-end gap-1">
			{socials.map((social, index) => (
				<a
					key={social.url}
					ref={(el) => {
						refs.current[index] = el;
					}}
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={social.label}
					title={social.label}
					className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition-[transform,color] duration-150 ease-out hover:text-accent motion-reduce:transform-none"
				>
					<SocialIcon label={social.label} />
				</a>
			))}
		</div>
	);
}
