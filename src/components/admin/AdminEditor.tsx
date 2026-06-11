'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PortfolioContent } from '@/lib/content';
import {
	EducationSection,
	ExperienceSection,
	ProfileSection,
	ProjectsSection,
	SkillsSection,
} from '@/components/admin/sections';

const TABS = ['Profile', 'Experience', 'Projects', 'Skills', 'Education'] as const;
type Tab = (typeof TABS)[number];

type SaveState = { kind: 'idle' } | { kind: 'saving' } | { kind: 'saved' } | { kind: 'error'; message: string };

export default function AdminEditor({ initialContent }: { initialContent: PortfolioContent }) {
	const router = useRouter();
	const [content, setContent] = useState(initialContent);
	const [tab, setTab] = useState<Tab>('Profile');
	const [saveState, setSaveState] = useState<SaveState>({ kind: 'idle' });

	const dirty = useMemo(
		() => JSON.stringify(content) !== JSON.stringify(initialContent) && saveState.kind !== 'saved',
		[content, initialContent, saveState.kind],
	);

	useEffect(() => {
		if (!dirty) return;
		const warn = (event: BeforeUnloadEvent) => event.preventDefault();
		window.addEventListener('beforeunload', warn);
		return () => window.removeEventListener('beforeunload', warn);
	}, [dirty]);

	function update<K extends keyof PortfolioContent>(key: K, value: PortfolioContent[K]) {
		setContent((current) => ({ ...current, [key]: value }));
		setSaveState({ kind: 'idle' });
	}

	async function save() {
		setSaveState({ kind: 'saving' });
		try {
			const res = await fetch('/api/admin/content', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(content),
			});
			if (res.ok) {
				setSaveState({ kind: 'saved' });
				router.refresh();
				return;
			}
			if (res.status === 401) {
				router.replace('/admin/login');
				return;
			}
			const data = await res.json().catch(() => null);
			setSaveState({ kind: 'error', message: data?.error ?? `Save failed (${res.status})` });
		} catch {
			setSaveState({ kind: 'error', message: 'Save failed — check your connection' });
		}
	}

	async function logout() {
		await fetch('/api/admin/logout', { method: 'POST' });
		router.replace('/admin/login');
	}

	return (
		<div className="min-h-screen">
			<header className="sticky top-0 z-10 border-b border-line bg-surface/90 backdrop-blur">
				<div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
					<div className="flex items-center gap-3">
						<h1 className="font-mono text-sm text-zinc-100">portfolio-admin</h1>
						<a href="/" target="_blank" className="text-xs text-zinc-500 hover:text-accent">
							view site ↗
						</a>
					</div>
					<div className="flex items-center gap-3">
						{saveState.kind === 'saved' && <span className="text-xs text-accent">Saved</span>}
						{saveState.kind === 'error' && <span className="text-xs text-red-400">{saveState.message}</span>}
						{saveState.kind === 'idle' && dirty && <span className="text-xs text-zinc-500">Unsaved changes</span>}
						<button onClick={save} disabled={saveState.kind === 'saving' || !dirty} className="btn-primary h-8 px-4 text-xs">
							{saveState.kind === 'saving' ? 'Saving…' : 'Save'}
						</button>
						<button onClick={logout} className="btn-ghost h-8 px-3 text-xs">
							Sign out
						</button>
					</div>
				</div>
			</header>

			<div className="mx-auto w-full max-w-5xl px-6 py-8">
				<nav className="mb-8 flex flex-wrap gap-2">
					{TABS.map((name) => (
						<button
							key={name}
							onClick={() => setTab(name)}
							className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
								tab === name ? 'bg-accent/15 text-accent' : 'text-zinc-400 hover:bg-panel hover:text-zinc-100'
							}`}
						>
							{name}
						</button>
					))}
				</nav>

				{tab === 'Profile' && <ProfileSection profile={content.profile} onChange={(value) => update('profile', value)} />}
				{tab === 'Experience' && (
					<ExperienceSection experience={content.experience} onChange={(value) => update('experience', value)} />
				)}
				{tab === 'Projects' && (
					<ProjectsSection projects={content.projects} onChange={(value) => update('projects', value)} />
				)}
				{tab === 'Skills' && <SkillsSection skills={content.skills} onChange={(value) => update('skills', value)} />}
				{tab === 'Education' && (
					<EducationSection education={content.education} onChange={(value) => update('education', value)} />
				)}
			</div>
		</div>
	);
}
