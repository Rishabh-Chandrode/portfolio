'use client';

import { CSSProperties, ReactNode } from 'react';

/**
 * Seamless infinite marquee. Children are rendered twice and the track is
 * translated by -50%, so the loop is gapless. Pauses on hover; honours
 * reduced motion via CSS.
 */
export default function Marquee({
	children,
	duration = 32,
	reverse = false,
}: {
	children: ReactNode;
	duration?: number;
	reverse?: boolean;
}) {
	return (
		<div className="marquee group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
			<div
				className="marquee-track flex shrink-0 items-center gap-4 pr-4"
				style={{ '--marquee-duration': `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' } as CSSProperties}
			>
				{children}
			</div>
			<div
				aria-hidden="true"
				className="marquee-track flex shrink-0 items-center gap-4 pr-4"
				style={{ '--marquee-duration': `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' } as CSSProperties}
			>
				{children}
			</div>
		</div>
	);
}
