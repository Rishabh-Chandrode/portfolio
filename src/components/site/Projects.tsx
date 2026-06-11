import Image from 'next/image';
import { Project } from '@/lib/content';
import Reveal from '@/components/site/Reveal';

function ExternalLinkIcon() {
	return (
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
		</svg>
	);
}

function ProjectLinks({ project }: { project: Project }) {
	return (
		<div className="flex items-center gap-3 font-mono text-xs">
			{project.github && (
				<a
					href={project.github}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-accent"
				>
					Source
				</a>
			)}
			{project.live && (
				<a
					href={project.live}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-accent"
				>
					Live <ExternalLinkIcon />
				</a>
			)}
		</div>
	);
}

function TechList({ tech }: { tech: string[] }) {
	return (
		<ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-zinc-500">
			{tech.map((item) => (
				<li key={item}>{item}</li>
			))}
		</ul>
	);
}

export default function Projects({ projects }: { projects: Project[] }) {
	const featured = projects.filter((project) => project.featured);
	const other = projects.filter((project) => !project.featured);

	return (
		<section id="projects" className="container-md py-20">
			<Reveal>
				<h2 className="section-heading">Projects</h2>
			</Reveal>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{featured.map((project, index) => (
					<Reveal key={project.title} delay={index * 75}>
						<article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-panel transition-colors hover:border-accent/40">
							{project.image && (
								<div className="relative aspect-[16/9] overflow-hidden border-b border-line">
									<Image
										src={project.image}
										alt={project.title}
										fill
										sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
										className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
									/>
								</div>
							)}
							<div className="flex flex-1 flex-col gap-3 p-5">
								<div className="flex items-start justify-between gap-3">
									<h3 className="font-semibold text-zinc-100">{project.title}</h3>
									<ProjectLinks project={project} />
								</div>
								<p className="flex-1 text-sm leading-relaxed">{project.description}</p>
								<TechList tech={project.tech} />
							</div>
						</article>
					</Reveal>
				))}
			</div>

			{other.length > 0 && (
				<>
					<Reveal>
						<h3 className="mb-6 mt-14 font-mono text-sm uppercase tracking-widest text-zinc-500">
							Other noteworthy projects
						</h3>
					</Reveal>
					<div className="grid gap-4 sm:grid-cols-2">
						{other.map((project) => (
							<Reveal key={project.title}>
								<article className="flex h-full flex-col gap-3 rounded-lg border border-line p-5 transition-colors hover:border-accent/40">
									<div className="flex items-start justify-between gap-3">
										<h3 className="font-semibold text-zinc-100">{project.title}</h3>
										<ProjectLinks project={project} />
									</div>
									<p className="flex-1 text-sm leading-relaxed">{project.description}</p>
									<TechList tech={project.tech} />
								</article>
							</Reveal>
						))}
					</div>
				</>
			)}
		</section>
	);
}
