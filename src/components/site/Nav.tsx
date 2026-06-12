'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const LINKS = [
	{ label: 'About', href: '#about' },
	{ label: 'Experience', href: '#experience' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Skills', href: '#skills' },
	{ label: 'Contact', href: '#contact' },
];

export default function Nav({ name, resumeUrl }: { name: string; resumeUrl: string }) {
	const [hidden, setHidden] = useState(false);
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState('');
	const lastY = useRef(0);

	// Slide the island away while scrolling down, bring it back on scroll up.
	useEffect(() => {
		const onScroll = () => {
			const y = window.scrollY;
			setHidden(y > 160 && y > lastY.current);
			lastY.current = y;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	// Scrollspy: highlight the link of the section currently in the middle of
	// the viewport.
	useEffect(() => {
		const sections = LINKS.map((link) => document.querySelector(link.href)).filter(
			(section): section is Element => section !== null,
		);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setActive(`#${entry.target.id}`);
				}
			},
			{ rootMargin: '-40% 0px -55% 0px' },
		);
		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, []);

	return (
		<header
			className={`fixed inset-x-0 top-3 z-40 flex justify-center px-4 transition-transform duration-300 motion-reduce:transform-none sm:top-4 ${
				hidden && !open ? '-translate-y-[150%]' : 'translate-y-0'
			}`}
		>
			<div className="relative w-full max-w-3xl">
				<nav className="flex items-center justify-between rounded-full border border-line bg-surface/70 py-1.5 pl-2 pr-2 shadow-lg shadow-black/40 backdrop-blur-xl">
					<Link
						href="#top"
						className="rounded-full px-3 py-1.5 font-mono text-xs text-zinc-100 transition-colors hover:text-accent"
					>
						{name.toLowerCase().replace(/\s+/g, '-')}
					</Link>

					<div className="hidden items-center gap-0.5 md:flex">
						{LINKS.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className={`rounded-full px-3 py-1.5 text-sm transition-colors duration-200 ${
									active === link.href
										? 'bg-white/10 text-zinc-100'
										: 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
								}`}
							>
								{link.label}
							</a>
						))}
					</div>

					{resumeUrl ? (
						<a
							href={resumeUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="hidden rounded-full bg-accent px-3.5 py-1.5 text-xs font-medium text-surface transition-colors hover:bg-accent/85 md:block"
						>
							Resume
						</a>
					) : (
						<span className="hidden w-2 md:block" />
					)}

					<button
						type="button"
						aria-label="Toggle menu"
						aria-expanded={open}
						onClick={() => setOpen((value) => !value)}
						className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-300 md:hidden"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
						</svg>
					</button>
				</nav>

				{open && (
					<div className="absolute inset-x-0 top-full mt-2 rounded-2xl border border-line bg-surface/90 p-2 shadow-lg shadow-black/40 backdrop-blur-xl md:hidden">
						{LINKS.map((link) => (
							<a
								key={link.href}
								href={link.href}
								onClick={() => setOpen(false)}
								className={`block rounded-xl px-4 py-2.5 text-sm transition-colors ${
									active === link.href ? 'bg-white/10 text-zinc-100' : 'text-zinc-300 hover:bg-white/5'
								}`}
							>
								{link.label}
							</a>
						))}
						{resumeUrl && (
							<a
								href={resumeUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="block rounded-xl px-4 py-2.5 text-sm text-accent hover:bg-white/5"
							>
								Resume
							</a>
						)}
					</div>
				)}
			</div>
		</header>
	);
}
