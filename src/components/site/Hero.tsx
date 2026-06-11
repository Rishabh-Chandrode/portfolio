import { Profile } from '@/lib/content';
import SocialIcon from '@/components/site/SocialIcon';

export default function Hero({ profile }: { profile: Profile }) {
	const current = profile.summary;

	return (
		<section id="top" className="container-md flex min-h-screen flex-col justify-center pb-16 pt-24">
			<p className="mb-4 font-mono text-sm text-accent">
				{profile.role} · {profile.location}
			</p>
			<h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl md:text-6xl">
				{profile.name}.
			</h1>
			<h2 className="mt-3 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-zinc-500 sm:text-3xl">
				{profile.headline}
			</h2>
			<p className="mt-6 max-w-xl leading-relaxed">{current}</p>

			<div className="mt-8 flex flex-wrap items-center gap-4">
				<a href="#projects" className="btn-primary">
					See my work
				</a>
				<a href="#contact" className="btn-ghost">
					Get in touch
				</a>
				<div className="flex items-center gap-1">
					{profile.socials.map((social) => (
						<a
							key={social.url}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={social.label}
							title={social.label}
							className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-500 transition-colors hover:text-accent"
						>
							<SocialIcon label={social.label} />
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
