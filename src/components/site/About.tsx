import Image from 'next/image';
import { Profile } from '@/lib/content';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import HighlightText from '@/components/site/HighlightText';

export default function About({ profile }: { profile: Profile }) {
	return (
		<section id="about" className="container-md py-24">
			<Reveal>
				<SectionHeading title="About" />
			</Reveal>
			<div className="flex flex-col-reverse gap-10 md:flex-row md:items-start">
				<div className="flex-1">
					<HighlightText paragraphs={profile.about} />
				</div>
				{profile.avatar && (
					<Reveal>
						<div className="shrink-0">
							<Image
								src={profile.avatar}
								alt={profile.name}
								width={208}
								height={208}
								className="h-44 w-44 rounded-2xl border border-line object-cover grayscale transition-all duration-300 hover:grayscale-0 md:h-52 md:w-52"
							/>
						</div>
					</Reveal>
				)}
			</div>
		</section>
	);
}
