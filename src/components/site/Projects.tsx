import { CSSProperties } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/content';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import Tilt3D from '@/components/site/Tilt3D';

function hostOf(url: string): string {
	try {
		return new URL(url).hostname.replace(/^www\./, '');
	} catch {
		return 'github.com';
	}
}

function ArrowIcon() {
	return (
		<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
			<path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

/** Mock browser chrome wrapping a project screenshot. */
function BrowserFrame({ project }: { project: Project }) {
	const host = project.live ? hostOf(project.live) : project.title.toLowerCase().replace(/\s+/g, '-');
	return (
		<div className="overflow-hidden rounded-xl border border-white/10 bg-surface/80 shadow-2xl shadow-black/40">
			<div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4">
				<span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
				<span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
				<span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
				<span className="mx-auto max-w-[60%] truncate rounded-md bg-surface/80 px-3 py-0.5 font-mono text-[11px] text-zinc-500">
					{host}
				</span>
			</div>
			<div className="relative aspect-[16/10]">
				<Image
					src={project.image || '/images/projects/default.webp'}
					alt={project.title}
					fill
					sizes="(min-width: 1024px) 46vw, 100vw"
					className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
				/>
			</div>
		</div>
	);
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
	const flip = index % 2 === 1;
	return (
		<Reveal>
			<Tilt3D max={4} scale={1} className="group relative rounded-3xl">
				<div className="glass preserve-3d grid items-center gap-8 rounded-3xl p-6 md:p-8 lg:grid-cols-2 lg:gap-12">
					<div
						className={`depth relative ${flip ? 'lg:order-2' : ''}`}
						style={{ '--z': '50px' } as CSSProperties}
					>
						<div
							aria-hidden="true"
							className="absolute -inset-6 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:bg-accent/20"
						/>
						<div className="relative">
							<BrowserFrame project={project} />
						</div>
					</div>

					<div className="depth" style={{ '--z': '26px' } as CSSProperties}>
						<p className="font-mono text-sm text-accent">{String(index + 1).padStart(2, '0')} / Featured</p>
						<h3 className="mt-3 text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">{project.title}</h3>
						<p className="mt-4 max-w-md leading-relaxed">{project.description}</p>
						<ul className="mt-5 flex flex-wrap gap-2">
							{project.tech.map((item) => (
								<li
									key={item}
									className="rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-zinc-400"
								>
									{item}
								</li>
							))}
						</ul>
						<div className="mt-6 flex flex-wrap items-center gap-3">
							{project.live && (
								<a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary px-4 py-1.5 text-xs">
									Live demo <ArrowIcon />
								</a>
							)}
							{project.github && (
								<a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-1.5 text-xs">
									Source
								</a>
							)}
						</div>
					</div>
				</div>
			</Tilt3D>
		</Reveal>
	);
}

function MiniCard({ project }: { project: Project }) {
	const href = project.live || project.github;
	return (
		<Reveal>
			<a
				href={href || undefined}
				target="_blank"
				rel="noopener noreferrer"
				className="glass group flex h-full overflow-hidden rounded-2xl transition-colors duration-300 hover:border-accent/40"
			>
				<div className="relative w-28 shrink-0 overflow-hidden sm:w-32">
					<Image
						src={project.image || '/images/projects/default.webp'}
						alt={project.title}
						fill
						sizes="128px"
						className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
					/>
				</div>
				<div className="flex flex-1 flex-col gap-1 p-4">
					<div className="flex items-center justify-between gap-2">
						<h4 className="font-semibold text-zinc-100 transition-colors group-hover:text-accent">{project.title}</h4>
						<span className="text-zinc-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent">
							<ArrowIcon />
						</span>
					</div>
					<p className="line-clamp-2 text-xs leading-relaxed text-zinc-500">{project.description}</p>
					<p className="mt-auto pt-1 font-mono text-[11px] text-zinc-600">{project.tech.slice(0, 3).join(' · ')}</p>
				</div>
			</a>
		</Reveal>
	);
}

export default function Projects({ projects }: { projects: Project[] }) {
	const featured = projects.filter((project) => project.featured);
	const other = projects.filter((project) => !project.featured);

	return (
		<section id="projects" className="container-md py-24">
			<Reveal>
				<SectionHeading title="Projects" />
			</Reveal>

			<div className="space-y-8">
				{featured.map((project, index) => (
					<FeaturedCard key={project.title} project={project} index={index} />
				))}
			</div>

			{other.length > 0 && (
				<>
					<Reveal>
						<h3 className="mb-5 mt-16 font-mono text-sm uppercase tracking-widest text-zinc-500">More builds</h3>
					</Reveal>
					<div className="grid gap-4 sm:grid-cols-2">
						{other.map((project) => (
							<MiniCard key={project.title} project={project} />
						))}
					</div>
				</>
			)}
		</section>
	);
}
