import Image from 'next/image';
import { Profile } from '@/lib/content';
import Reveal from '@/components/site/Reveal';

export default function About({ profile }: { profile: Profile }) {
	return (
		<section id="about" className="container-md py-20">
			<Reveal>
				<h2 className="section-heading">About</h2>
				<div className="flex flex-col-reverse gap-10 md:flex-row md:items-start">
					<div className="flex-1 space-y-4 leading-relaxed">
						{profile.about.map((paragraph) => (
							<p key={paragraph.slice(0, 40)}>{paragraph}</p>
						))}
					</div>
					{profile.avatar && (
						<div className="shrink-0">
							<Image
								src={profile.avatar}
								alt={profile.name}
								width={208}
								height={208}
								className="h-44 w-44 rounded-lg border border-line object-cover grayscale transition-all duration-300 hover:grayscale-0 md:h-52 md:w-52"
							/>
						</div>
					)}
				</div>
			</Reveal>
		</section>
	);
}
