'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const LINKS = [
	{ label: 'About', href: '#about' },
	{ label: 'Experience', href: '#experience' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Skills', href: '#skills' },
	{ label: 'Contact', href: '#contact' },
];

export default function Nav({ name, resumeUrl }: { name: string; resumeUrl: string }) {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header
			className={`fixed inset-x-0 top-0 z-40 transition-colors ${
				scrolled || open ? 'border-b border-line bg-surface/90 backdrop-blur' : 'bg-transparent'
			}`}
		>
			<nav className="container-md flex h-16 items-center justify-between">
				<Link href="#top" className="font-mono text-sm text-zinc-100 hover:text-accent">
					{name.toLowerCase().replace(/\s+/g, '-')}
				</Link>

				<div className="hidden items-center gap-7 md:flex">
					{LINKS.map((link) => (
						<a key={link.href} href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-zinc-100">
							{link.label}
						</a>
					))}
					{resumeUrl && (
						<a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost h-8 px-3 text-xs">
							Resume
						</a>
					)}
				</div>

				<button
					type="button"
					aria-label="Toggle menu"
					aria-expanded={open}
					onClick={() => setOpen((value) => !value)}
					className="flex h-9 w-9 items-center justify-center text-zinc-300 md:hidden"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
					</svg>
				</button>
			</nav>

			{open && (
				<div className="border-t border-line bg-surface/95 backdrop-blur md:hidden">
					<div className="container-md flex flex-col gap-1 py-3">
						{LINKS.map((link) => (
							<a
								key={link.href}
								href={link.href}
								onClick={() => setOpen(false)}
								className="rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-panel hover:text-zinc-100"
							>
								{link.label}
							</a>
						))}
						{resumeUrl && (
							<a
								href={resumeUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-md px-3 py-2 text-sm text-accent hover:bg-panel"
							>
								Resume
							</a>
						)}
					</div>
				</div>
			)}
		</header>
	);
}
