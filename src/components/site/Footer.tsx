import { Social } from '@/lib/content';
import SocialIcon from '@/components/site/SocialIcon';

export default function Footer({ name, socials }: { name: string; socials: Social[] }) {
	return (
		<footer className="border-t border-line">
			<div className="container-md flex flex-col items-center gap-4 py-8 sm:flex-row sm:justify-between">
				<p className="font-mono text-xs text-zinc-500">
					© {new Date().getFullYear()} {name}. Designed & built by me.
				</p>
				<div className="flex items-center gap-1">
					{socials.map((social) => (
						<a
							key={social.url}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={social.label}
							className="flex h-9 w-9 items-center justify-center text-zinc-500 transition-colors hover:text-accent"
						>
							<SocialIcon label={social.label} className="h-4 w-4" />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
