import { Education, Experience as ExperienceT } from '@/lib/content';
import Reveal from '@/components/site/Reveal';

export default function Experience({ experience, education }: { experience: ExperienceT[]; education: Education[] }) {
	return (
		<section id="experience" className="container-md py-20">
			<Reveal>
				<h2 className="section-heading">Experience</h2>
			</Reveal>

			<ol className="space-y-12">
				{experience.map((job) => (
					<li key={`${job.company}-${job.start}`}>
						<Reveal>
							<div className="grid gap-2 md:grid-cols-[11rem_1fr] md:gap-8">
								<p className="font-mono text-xs leading-6 text-zinc-500">
									{job.start} — {job.end}
								</p>
								<div>
									<h3 className="text-lg font-semibold text-zinc-100">
										{job.role} <span className="text-accent">@ {job.company}</span>
									</h3>
									<p className="mt-0.5 text-sm text-zinc-500">{job.location}</p>
									<ul className="mt-4 space-y-2.5">
										{job.points.map((point) => (
											<li key={point.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed">
												<span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
												{point}
											</li>
										))}
									</ul>
								</div>
							</div>
						</Reveal>
					</li>
				))}
			</ol>

			{education.length > 0 && (
				<Reveal>
					<h3 className="mb-6 mt-16 font-mono text-sm uppercase tracking-widest text-zinc-500">Education</h3>
					<ol className="space-y-6">
						{education.map((entry) => (
							<li key={entry.institution} className="grid gap-1 md:grid-cols-[11rem_1fr] md:gap-8">
								<p className="font-mono text-xs leading-6 text-zinc-500">
									{entry.start} — {entry.end}
								</p>
								<div>
									<p className="font-medium text-zinc-200">{entry.degree}</p>
									<p className="text-sm text-zinc-500">{entry.institution}</p>
								</div>
							</li>
						))}
					</ol>
				</Reveal>
			)}
		</section>
	);
}
