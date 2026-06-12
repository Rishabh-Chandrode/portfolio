import { CSSProperties } from 'react';
import { SkillGroup } from '@/lib/content';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import Tilt3D from '@/components/site/Tilt3D';
import Marquee from '@/components/site/Marquee';

export default function Skills({ skills }: { skills: SkillGroup[] }) {
	const allSkills = Array.from(new Set(skills.flatMap((group) => group.items)));

	return (
		<section id="skills" className="container-md py-24">
			<Reveal>
				<SectionHeading title="Skills" />
			</Reveal>

			<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{skills.map((group, index) => (
					<Reveal key={group.category} delay={index * 60}>
						<Tilt3D className="group h-full rounded-2xl">
							<div className="glass relative h-full overflow-hidden rounded-2xl p-6">
								<span
									aria-hidden="true"
									className="pointer-events-none absolute -right-2 -top-3 select-none font-mono text-7xl font-bold text-white/[0.03]"
								>
									{String(index + 1).padStart(2, '0')}
								</span>
								<div className="preserve-3d relative">
									<h3
										className="depth mb-4 font-mono text-xs uppercase tracking-widest text-accent"
										style={{ '--z': '30px' } as CSSProperties}
									>
										{group.category}
									</h3>
									<ul className="depth flex flex-wrap gap-2" style={{ '--z': '18px' } as CSSProperties}>
										{group.items.map((item) => (
											<li
												key={item}
												className="rounded-lg border border-line bg-surface/60 px-2.5 py-1 text-xs text-zinc-300 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
											>
												{item}
											</li>
										))}
									</ul>
								</div>
							</div>
						</Tilt3D>
					</Reveal>
				))}
			</div>

			<Reveal>
				<div className="mt-8">
					<Marquee duration={36}>
						{allSkills.map((skill) => (
							<span
								key={skill}
								className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-panel/60 px-4 py-1.5 font-mono text-sm text-zinc-400"
							>
								<span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
								{skill}
							</span>
						))}
					</Marquee>
				</div>
			</Reveal>
		</section>
	);
}
