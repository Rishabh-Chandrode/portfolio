import { SkillGroup } from '@/lib/content';
import Reveal from '@/components/site/Reveal';

export default function Skills({ skills }: { skills: SkillGroup[] }) {
	return (
		<section id="skills" className="container-md py-20">
			<Reveal>
				<h2 className="section-heading">Skills</h2>
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
										className="rounded border border-line bg-panel px-2.5 py-1 text-xs text-zinc-300"
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
