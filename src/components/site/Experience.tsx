import { Education, Experience as ExperienceT } from '@/lib/content';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import Timeline from '@/components/site/Timeline';

export default function Experience({ experience, education }: { experience: ExperienceT[]; education: Education[] }) {
	return (
		<section id="experience" className="container-md py-24">
			<Reveal>
				<SectionHeading title="Experience" />
			</Reveal>

			<Timeline items={experience} />

			{education.length > 0 && (
				<Reveal>
					<h3 className="mb-6 mt-16 font-mono text-sm uppercase tracking-widest text-zinc-500">Education</h3>
					<div className="grid gap-4 sm:grid-cols-2">
						{education.map((entry) => (
							<div key={entry.institution} className="glass rounded-2xl p-5">
								<p className="font-mono text-xs text-accent">
									{entry.start} — {entry.end}
								</p>
								<p className="mt-2 font-medium text-zinc-100">{entry.degree}</p>
								<p className="text-sm text-zinc-500">{entry.institution}</p>
							</div>
						))}
					</div>
				</Reveal>
			)}
		</section>
	);
}
