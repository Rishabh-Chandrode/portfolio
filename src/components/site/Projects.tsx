import { Project } from '@/lib/content';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import ProjectShowcase from '@/components/site/ProjectShowcase';

function RowLinks({ project }: { project: Project }) {
	return (
		<div className="flex items-center gap-4 font-mono text-xs">
			{project.github && (
				<a
					href={project.github}
					target="_blank"
					rel="noopener noreferrer"
					className="text-zinc-400 transition-colors hover:text-accent"
				>
					Source
				</a>
			)}
			{project.live && (
				<a
					href={project.live}
					target="_blank"
					rel="noopener noreferrer"
					className="text-zinc-400 transition-colors hover:text-accent"
				>
					Live ↗
				</a>
			)}
		</div>
	);
}

export default function Projects({ projects }: { projects: Project[] }) {
	const featured = projects.filter((project) => project.featured);
	const other = projects.filter((project) => !project.featured);

	return (
		<section id="projects" className="py-24">
			<div className="container-md">
				<Reveal>
					<SectionHeading title="Projects" />
				</Reveal>
			</div>

			<ProjectShowcase projects={featured} />

			{other.length > 0 && (
				<div className="container-md mt-24">
					<Reveal>
						<h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-zinc-500">More projects</h3>
					</Reveal>
					<ol className="group/list border-t border-line">
						{other.map((project, index) => (
							<li
								key={project.title}
								className="transition-opacity duration-300 group-hover/list:opacity-40 hover:!opacity-100"
							>
								<Reveal>
									<div className="group grid gap-2 border-b border-line py-6 transition-all duration-300 hover:pl-2 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-6">
										<span className="font-mono text-xs text-zinc-600">
											{String(featured.length + index + 1).padStart(2, '0')}
										</span>
										<div>
											<h4 className="font-semibold text-zinc-100 transition-colors duration-300 group-hover:text-accent">
												{project.title}
											</h4>
											<p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-500">{project.description}</p>
											<p className="mt-2 font-mono text-xs text-zinc-600">{project.tech.join(' · ')}</p>
										</div>
										<RowLinks project={project} />
									</div>
								</Reveal>
							</li>
						))}
					</ol>
				</div>
			)}
		</section>
	);
}
