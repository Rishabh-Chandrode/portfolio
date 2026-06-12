import { CSSProperties } from 'react';
import { Profile } from '@/lib/content';
import Decode from '@/components/site/Decode';
import Dock from '@/components/site/Dock';
import Magnetic from '@/components/site/Magnetic';
import Parallax from '@/components/site/Parallax';
import ParticleField from '@/components/site/ParticleField';

function enterDelay(ms: number): CSSProperties {
	return { '--enter-delay': `${ms}ms` } as CSSProperties;
}

export default function Hero({ profile }: { profile: Profile }) {
	return (
		<section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
			<div aria-hidden="true" className="absolute inset-0 overflow-hidden">
				<div className="aurora-a absolute -left-1/4 -top-1/4 h-[70vh] w-[60vw] rounded-full bg-accent/15 blur-[120px]" />
				<div className="aurora-b absolute -bottom-1/4 -right-1/4 h-[60vh] w-[55vw] rounded-full bg-sky-500/10 blur-[120px]" />
				<div className="grid-floor absolute inset-x-0 bottom-0 h-[42vh] opacity-60" />
			</div>
			<ParticleField />
			<Parallax>
				<div className="container-md relative pb-16 pt-28">
					<p className="animate-enter mb-5 font-mono text-sm text-accent" style={enterDelay(0)}>
						<Decode text={`${profile.role} · ${profile.location}`} />
					</p>
					<h1
						className="animate-enter max-w-4xl bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text pb-1 text-5xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-6xl md:text-7xl"
						style={enterDelay(120)}
					>
						{profile.name}.
					</h1>
					<h2
						className="animate-enter mt-4 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-zinc-500 sm:text-3xl"
						style={enterDelay(240)}
					>
						{profile.headline}
					</h2>
					<p className="animate-enter mt-7 max-w-xl leading-relaxed" style={enterDelay(360)}>
						{profile.summary}
					</p>

					<div className="animate-enter mt-9 flex flex-wrap items-center gap-4" style={enterDelay(480)}>
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
						<Dock socials={profile.socials} />
					</div>
				</div>
			</Parallax>

			<a
				href="#about"
				aria-label="Scroll to about"
				className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-600 transition-colors hover:text-accent sm:flex"
			>
				<span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
				<span className="flex h-8 w-5 items-start justify-center rounded-full border border-current p-1">
					<span className="float-y h-1.5 w-1 rounded-full bg-current" />
				</span>
			</a>
		</section>
	);
}
