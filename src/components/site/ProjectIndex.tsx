'use client';

import Image from 'next/image';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Project } from '@/lib/content';

const PREVIEW_W = 320;
const PREVIEW_H = 200;

/**
 * Typographic project index. Hovering a row floats an image preview that
 * chases the cursor with velocity-based tilt; clicking expands the row in
 * place. The preview is desktop-only — touch users get the expanded image.
 */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const previewRef = useRef<HTMLDivElement>(null);
	const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, settled: false });

	const previewVisible = hoverIndex !== null && hoverIndex !== openIndex;

	// Lerp the preview toward the cursor; tilt it by horizontal velocity.
	useEffect(() => {
		const node = previewRef.current;
		if (
			!node ||
			window.matchMedia('(pointer: coarse)').matches ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			return;
		}
		let frame = 0;
		const loop = () => {
			const p = pos.current;
			p.x += (p.tx - p.x) * 0.12;
			p.y += (p.ty - p.y) * 0.12;
			const tilt = Math.max(-8, Math.min(8, (p.tx - p.x) * 0.06));
			node.style.transform = `translate3d(${(p.x - PREVIEW_W / 2).toFixed(1)}px, ${(p.y - PREVIEW_H / 2).toFixed(1)}px, 0) rotate(${tilt.toFixed(2)}deg)`;
			frame = requestAnimationFrame(loop);
		};
		frame = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(frame);
	}, []);

	function onMouseMove(event: MouseEvent<HTMLOListElement>) {
		const p = pos.current;
		p.tx = event.clientX;
		p.ty = event.clientY;
		if (!p.settled) {
			// First entry: snap into place instead of flying in from the corner.
			p.x = p.tx;
			p.y = p.ty;
			p.settled = true;
		}
	}

	function toggle(index: number) {
		setOpenIndex((current) => (current === index ? null : index));
	}

	return (
		<>
			<p className="-mt-5 mb-4 font-mono text-xs text-zinc-600">
				{String(projects.length).padStart(2, '0')} builds — hover to preview, click to expand
			</p>

			<ol onMouseMove={onMouseMove} onMouseLeave={() => setHoverIndex(null)} className="border-t border-line">
				{projects.map((project, index) => {
					const open = openIndex === index;
					return (
						<li key={project.title} className="border-b border-line">
							<button
								type="button"
								aria-expanded={open}
								onClick={() => toggle(index)}
								onMouseEnter={() => setHoverIndex(index)}
								onMouseLeave={() => setHoverIndex(null)}
								className="group flex w-full items-baseline gap-4 py-6 text-left sm:gap-8 md:py-8"
							>
								<span className="font-mono text-xs text-zinc-600 transition-colors duration-300 group-hover:text-accent">
									{String(index + 1).padStart(2, '0')}
								</span>
								<h3
									className={`flex-1 text-3xl font-bold tracking-tight transition-all duration-300 sm:text-4xl md:text-5xl ${
										open ? 'text-zinc-100' : 'text-zinc-500 group-hover:translate-x-2 group-hover:text-zinc-100'
									}`}
								>
									{project.title}
								</h3>
								<span className="hidden font-mono text-xs text-zinc-600 md:block">
									{project.tech.slice(0, 3).join(' · ')}
								</span>
								<span
									aria-hidden="true"
									className={`text-xl text-zinc-600 transition-transform duration-300 ${
										open ? 'rotate-45 text-accent' : 'group-hover:text-zinc-300'
									}`}
								>
									+
								</span>
							</button>

							<div
								className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] ${
									open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
								}`}
							>
								<div className="overflow-hidden">
									<div className="grid gap-8 pb-10 pl-8 sm:pl-12 md:grid-cols-[1fr_22rem]">
										<div className="flex flex-col justify-between gap-6">
											<p className="max-w-xl leading-relaxed">{project.description}</p>
											<div className="space-y-5">
												<ul className="flex flex-wrap gap-2">
													{project.tech.map((item) => (
														<li
															key={item}
															className="rounded-full border border-line bg-panel px-3 py-1 font-mono text-xs text-zinc-400"
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
															Live demo <span aria-hidden="true">↗</span>
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
										<div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
											<Image
												src={project.image || '/images/projects/default.webp'}
												alt={project.title}
												fill
												sizes="(min-width: 768px) 22rem, 100vw"
												className="object-cover"
											/>
										</div>
									</div>
								</div>
							</div>
						</li>
					);
				})}
			</ol>

			{/* Cursor-chasing preview (desktop only) */}
			<div
				ref={previewRef}
				aria-hidden="true"
				className="pointer-events-none fixed left-0 top-0 z-30 hidden will-change-transform md:block"
			>
				<div
					style={{ width: PREVIEW_W, height: PREVIEW_H }}
					className={`relative overflow-hidden rounded-2xl border border-line shadow-2xl shadow-black/60 transition-[opacity,scale] duration-300 ${
						previewVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
					}`}
				>
					{projects.map((project, index) => (
						<Image
							key={project.title}
							src={project.image || '/images/projects/default.webp'}
							alt=""
							fill
							sizes="320px"
							className={`object-cover transition-opacity duration-300 ${
								hoverIndex === index ? 'opacity-100' : 'opacity-0'
							}`}
						/>
					))}
				</div>
			</div>
		</>
	);
}
