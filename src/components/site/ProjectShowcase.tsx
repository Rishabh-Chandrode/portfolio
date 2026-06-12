'use client';

import Image from 'next/image';
import { CSSProperties, useEffect, useRef } from 'react';
import { Project } from '@/lib/content';

/**
 * Pinned horizontal showcase: the wrapper is several viewports tall, the
 * inner panel sticks to the screen, and vertical scroll progress drives the
 * card track sideways. Falls back to a vertical stack on small screens and
 * for reduced motion.
 */
export default function ProjectShowcase({ projects }: { projects: Project[] }) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const fillRef = useRef<HTMLDivElement>(null);
	const counterRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const wrapper = wrapperRef.current;
		const track = trackRef.current;
		if (!wrapper || !track) return;
		const desktop = window.matchMedia('(min-width: 768px)');
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				if (!desktop.matches) {
					track.style.transform = '';
					return;
				}
				const rect = wrapper.getBoundingClientRect();
				const range = rect.height - window.innerHeight;
				const progress = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
				const distance = Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth ?? 0));
				if (!reduced) {
					track.style.transform = `translate3d(${(-progress * distance).toFixed(1)}px, 0, 0)`;
				}
				if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
				if (counterRef.current) {
					const index = Math.min(projects.length, Math.floor(progress * projects.length) + 1);
					counterRef.current.textContent = String(index).padStart(2, '0');
				}
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
	}, [projects.length]);

	return (
		<div
			ref={wrapperRef}
			style={{ '--showcase-h': `${projects.length * 110}vh` } as CSSProperties}
			className="md:h-[var(--showcase-h)]"
		>
			<div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:overflow-hidden">
				<div
					ref={trackRef}
					className="flex flex-col gap-10 px-6 will-change-transform md:flex-row md:items-stretch md:gap-[6vw] md:px-[10vw]"
				>
					{projects.map((project, index) => (
						<article
							key={project.title}
							className="group grid shrink-0 overflow-hidden rounded-3xl border border-line bg-panel transition-colors duration-300 hover:border-accent/30 md:h-[62vh] md:max-h-[600px] md:min-h-[440px] md:w-[74vw] md:max-w-5xl md:grid-cols-[44%_56%]"
						>
							<div className="order-2 flex flex-col justify-between gap-6 p-7 md:order-1 md:p-10">
								<div>
									<p className="font-mono text-sm text-accent">{String(index + 1).padStart(2, '0')}</p>
									<h3 className="mt-3 text-2xl font-bold tracking-tight text-zinc-100 md:text-4xl">{project.title}</h3>
									<p className="mt-4 max-w-md leading-relaxed">{project.description}</p>
								</div>
								<div className="space-y-5">
									<ul className="flex flex-wrap gap-2">
										{project.tech.map((item) => (
											<li
												key={item}
												className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-zinc-400"
											>
												{item}
											</li>
										))}
									</ul>
									<div className="flex flex-wrap items-center gap-3">
										{project.live && (
											<a
												href={project.live}
												target="_blank"
												rel="noopener noreferrer"
												className="btn-primary px-4 py-1.5 text-xs"
											>
												Live demo
												<span aria-hidden="true">↗</span>
											</a>
										)}
										{project.github && (
											<a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												className="btn-ghost px-4 py-1.5 text-xs"
											>
												Source
											</a>
										)}
									</div>
								</div>
							</div>
							<div className="relative order-1 aspect-[16/10] md:order-2 md:aspect-auto">
								<Image
									src={project.image || '/images/projects/default.webp'}
									alt={project.title}
									fill
									sizes="(min-width: 768px) 42vw, 100vw"
									className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-panel/70 to-transparent md:bg-gradient-to-r md:from-panel md:via-panel/10 md:to-transparent" />
							</div>
						</article>
					))}
				</div>

				<div className="container-md mt-10 hidden items-center gap-5 md:flex">
					<p className="font-mono text-xs text-zinc-500">
						<span ref={counterRef} className="text-accent">
							01
						</span>{' '}
						/ {String(projects.length).padStart(2, '0')}
					</p>
					<div className="h-px flex-1 bg-line">
						<div ref={fillRef} className="h-full origin-left scale-x-0 bg-accent" />
					</div>
					<p className="font-mono text-xs text-zinc-600">keep scrolling</p>
				</div>
			</div>
		</div>
	);
}
