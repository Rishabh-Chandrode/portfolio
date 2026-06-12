import { CSSProperties } from 'react';
import { Profile } from '@/lib/content';
import SocialIcon from '@/components/site/SocialIcon';
import Decode from '@/components/site/Decode';
import Magnetic from '@/components/site/Magnetic';
import Parallax from '@/components/site/Parallax';
import ParticleField from '@/components/site/ParticleField';

function enterDelay(ms: number): CSSProperties {
	return { '--enter-delay': `${ms}ms` } as CSSProperties;
}

export default function Hero({ profile }: { profile: Profile }) {
	return (
		<section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
			<ParticleField />
			<Parallax>
				<div className="container-md relative pb-16 pt-24">
					<p className="animate-enter mb-4 font-mono text-sm text-accent" style={enterDelay(0)}>
						<Decode text={`${profile.role} · ${profile.location}`} />
					</p>
					<h1
						className="animate-enter max-w-3xl text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl md:text-6xl"
						style={enterDelay(120)}
					>
						{profile.name}.
					</h1>
					<h2
						className="animate-enter mt-3 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-zinc-500 sm:text-3xl"
						style={enterDelay(240)}
					>
						{profile.headline}
					</h2>
					<p className="animate-enter mt-6 max-w-xl leading-relaxed" style={enterDelay(360)}>
						{profile.summary}
					</p>

					<div className="animate-enter mt-8 flex flex-wrap items-center gap-4" style={enterDelay(480)}>
						<Magnetic>
							<a href="#projects" className="btn-primary group">
								See my work
								<span className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true">
									↓
								</span>
							</a>
						</Magnetic>
						<Magnetic>
							<a href="#contact" className="btn-ghost group">
								Get in touch
								<span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
									→
								</span>
							</a>
						</Magnetic>
						<div className="flex items-center gap-1">
							{profile.socials.map((social) => (
								<a
									key={social.url}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={social.label}
									title={social.label}
									className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-500 transition-all duration-200 hover:-translate-y-0.5 hover:text-accent"
								>
									<SocialIcon label={social.label} />
								</a>
							))}
						</div>
					</div>
				</div>
			</Parallax>
		</section>
	);
}
