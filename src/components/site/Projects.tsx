import { Project } from '@/lib/content';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import ProjectIndex from '@/components/site/ProjectIndex';

export default function Projects({ projects }: { projects: Project[] }) {
	// Featured work leads the index, everything else follows.
	const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

	return (
		<section id="projects" className="container-md py-24">
			<Reveal>
				<SectionHeading title="Projects" />
			</Reveal>
			<Reveal>
				<ProjectIndex projects={ordered} />
			</Reveal>
		</section>
	);
}
