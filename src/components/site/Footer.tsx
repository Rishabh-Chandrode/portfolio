import { Social } from '@/lib/content';
import SocialIcon from '@/components/site/SocialIcon';

export default function Footer({ name, socials }: { name: string; socials: Social[] }) {
	return (
		<footer className="relative overflow-hidden border-t border-line">
			{/* Oversized faded name mark */}
			<p
				aria-hidden="true"
				className="pointer-events-none select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-tighter text-white/[0.02]"
			>
				{name.split(' ')[0]}
			</p>

			<div className="container-md -mt-[6vw] flex flex-col items-center gap-5 pb-10 sm:flex-row sm:justify-between">
				<p className="font-mono text-xs text-zinc-500">
					© {new Date().getFullYear()} {name}. Designed &amp; built by me.
				</p>
				<div className="flex items-center gap-1">
					{socials.map((social) => (
						<a
							key={social.url}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={social.label}
							className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-all duration-200 hover:-translate-y-0.5 hover:text-accent"
						>
							<SocialIcon label={social.label} className="h-4 w-4" />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
