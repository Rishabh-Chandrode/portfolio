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
	const [scrolled, setScrolled] = useState(false);
	const [hidden, setHidden] = useState(false);
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState('');
	const lastY = useRef(0);

	// Slide the bar away while scrolling down, bring it back on scroll up.
	useEffect(() => {
		const onScroll = () => {
			const y = window.scrollY;
			setScrolled(y > 8);
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
			className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,transform] duration-300 motion-reduce:transform-none ${
				scrolled || open ? 'border-b border-line bg-surface/90 backdrop-blur' : 'bg-transparent'
			} ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}
		>
			<nav className="container-md flex h-16 items-center justify-between">
				<Link href="#top" className="font-mono text-sm text-zinc-100 hover:text-accent">
					{name.toLowerCase().replace(/\s+/g, '-')}
				</Link>

				<div className="hidden items-center gap-7 md:flex">
					{LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className={`relative text-sm transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform after:duration-300 hover:text-zinc-100 hover:after:scale-x-100 ${
								active === link.href ? 'text-zinc-100 after:scale-x-100' : 'text-zinc-400 after:scale-x-0'
							}`}
						>
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
