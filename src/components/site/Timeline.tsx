'use client';

import { CSSProperties, useEffect, useRef } from 'react';
import { Experience } from '@/lib/content';
import Reveal from '@/components/site/Reveal';
import Tilt3D from '@/components/site/Tilt3D';

/**
 * Vertical timeline whose accent "beam" fills from the top as the section
 * scrolls through the viewport; each role sits in a 3D glass card.
 */
export default function Timeline({ items }: { items: Experience[] }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const beamRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		const beam = beamRef.current;
		if (!container || !beam) return;

		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const rect = container.getBoundingClientRect();
				const start = window.innerHeight * 0.7;
				const progress = Math.min(1, Math.max(0, (start - rect.top) / rect.height));
				beam.style.transform = `scaleY(${progress.toFixed(4)})`;
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
		<div ref={containerRef} className="relative">
			{/* Track + animated beam */}
			<div aria-hidden="true" className="absolute bottom-2 left-3 top-2 w-px bg-line" />
			<div
				ref={beamRef}
				aria-hidden="true"
				className="absolute bottom-2 left-3 top-2 w-px origin-top scale-y-0 bg-gradient-to-b from-accent via-accent to-transparent"
				style={{ boxShadow: '0 0 14px rgba(76,195,138,0.8)' }}
			/>

			<ol className="space-y-6">
				{items.map((job) => (
					<li key={`${job.company}-${job.start}`} className="grid grid-cols-[24px_1fr] gap-4 sm:gap-6">
						<div className="relative">
							<span
								aria-hidden="true"
								className="absolute left-3 top-7 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-surface"
								style={{ boxShadow: '0 0 12px rgba(76,195,138,0.7)' }}
							/>
						</div>
						<Reveal>
							<Tilt3D max={6} scale={1.01} className="glass rounded-2xl">
								<div className="preserve-3d p-6 md:p-7">
									<div className="depth" style={{ '--z': '26px' } as CSSProperties}>
										<p className="font-mono text-xs text-accent">
											{job.start} — {job.end}
										</p>
										<h3 className="mt-2 text-lg font-semibold text-zinc-100 md:text-xl">
											{job.role} <span className="text-accent">@ {job.company}</span>
										</h3>
										<p className="mt-0.5 text-sm text-zinc-500">{job.location}</p>
									</div>
									<ul className="depth mt-4 space-y-2.5" style={{ '--z': '14px' } as CSSProperties}>
										{job.points.map((point) => (
											<li key={point.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed">
												<span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
												{point}
											</li>
										))}
									</ul>
								</div>
							</Tilt3D>
						</Reveal>
					</li>
				))}
			</ol>
		</div>
	);
}
