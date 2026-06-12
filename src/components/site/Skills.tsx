import { SkillGroup } from '@/lib/content';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';

export default function Skills({ skills }: { skills: SkillGroup[] }) {
	return (
		<section id="skills" className="container-md py-20">
			<Reveal>
				<SectionHeading title="Skills" />
			</Reveal>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{skills.map((group, index) => (
					<Reveal key={group.category} delay={index * 50}>
						<div className="h-full rounded-lg border border-line p-5">
							<h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">{group.category}</h3>
							<ul className="flex flex-wrap gap-2">
								{group.items.map((item) => (
									<li
										key={item}
										className="rounded border border-line bg-panel px-2.5 py-1 text-xs text-zinc-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
									>
										{item}
									</li>
								))}
							</ul>
						</div>
					</Reveal>
				))}
			</div>
		</section>
	);
}
