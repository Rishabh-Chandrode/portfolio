import { CSSProperties } from 'react';
import Image from 'next/image';
import { Profile } from '@/lib/content';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import HighlightText from '@/components/site/HighlightText';
import Tilt3D from '@/components/site/Tilt3D';

export default function About({ profile }: { profile: Profile }) {
	return (
		<section id="about" className="container-md py-24">
			<Reveal>
				<SectionHeading title="About" />
			</Reveal>
			<div className="flex flex-col-reverse gap-12 md:flex-row md:items-start">
				<div className="flex-1">
					<HighlightText paragraphs={profile.about} />
				</div>

				{profile.avatar && (
					<Reveal>
						<div className="relative shrink-0 self-center md:self-start">
							<div
								aria-hidden="true"
								className="float-y absolute -inset-4 rounded-[2rem] bg-accent/10 blur-2xl"
							/>
							<Tilt3D max={14} scale={1.04} className="relative rounded-[1.75rem]">
								<div className="glass preserve-3d relative overflow-hidden rounded-[1.75rem] p-3">
									<Image
										src={profile.avatar}
										alt={profile.name}
										width={240}
										height={300}
										className="depth h-64 w-56 rounded-2xl object-cover grayscale transition-all duration-500 hover:grayscale-0"
										style={{ '--z': '24px' } as CSSProperties}
									/>
									<div
										className="depth absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-white/10 bg-surface/80 px-3 py-1.5 backdrop-blur"
										style={{ '--z': '60px' } as CSSProperties}
									>
										<span className="relative flex h-2 w-2">
											<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
											<span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
										</span>
										<span className="text-xs font-medium text-zinc-200">Open to work</span>
									</div>
								</div>
							</Tilt3D>
						</div>
					</Reveal>
				)}
			</div>
		</section>
	);
}
