'use client';

import { FormEvent, useState } from 'react';
import SectionHeading from '@/components/site/SectionHeading';
import Tilt3D from '@/components/site/Tilt3D';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact({ email }: { email: string }) {
	const [status, setStatus] = useState<Status>('idle');

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);
		setStatus('sending');
		try {
			const res = await fetch('/api/send', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: data.get('email'),
					subject: data.get('subject'),
					message: data.get('message'),
				}),
			});
			if (!res.ok) throw new Error(`Request failed with ${res.status}`);
			form.reset();
			setStatus('sent');
		} catch {
			setStatus('error');
		}
	}

	return (
		<section id="contact" className="container-md py-24">
			<SectionHeading title="Contact" />

			<div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
				<div>
					<h3 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-4xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-5xl">
						Let&apos;s build
						<br />
						something.
					</h3>
					<p className="mt-6 max-w-sm leading-relaxed">
						Whether it&apos;s a role, a project, or a question about something I&apos;ve built — my inbox is open and
						I&apos;ll get back to you fast.
					</p>
					<a
						href={`mailto:${email}`}
						className="group mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent"
					>
						<span className="transition-transform duration-300 group-hover:translate-x-1">{email}</span>
						<span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
							↗
						</span>
					</a>
				</div>

				<Tilt3D max={5} scale={1} glare={false} className="rounded-3xl">
					<form onSubmit={handleSubmit} className="glass space-y-4 rounded-3xl p-6 sm:p-8">
						<div className="grid gap-4 sm:grid-cols-2">
							<label className="block">
								<span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">Email</span>
								<input name="email" type="email" required placeholder="you@example.com" className="input bg-surface/60" />
							</label>
							<label className="block">
								<span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">Subject</span>
								<input name="subject" type="text" required placeholder="What's up?" className="input bg-surface/60" />
							</label>
						</div>
						<label className="block">
							<span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">Message</span>
							<textarea
								name="message"
								required
								placeholder="Tell me about it…"
								rows={5}
								className="input resize-y bg-surface/60"
							/>
						</label>
						<div className="flex flex-wrap items-center gap-4 pt-1">
							<button type="submit" disabled={status === 'sending'} className="btn-primary">
								{status === 'sending' ? 'Sending…' : 'Send message'}
								<span aria-hidden="true">→</span>
							</button>
							{status === 'sent' && <p className="text-sm text-accent">Sent — thanks for reaching out.</p>}
							{status === 'error' && (
								<p className="text-sm text-red-400">Something went wrong. Email me directly instead.</p>
							)}
						</div>
					</form>
				</Tilt3D>
			</div>
		</section>
	);
}
