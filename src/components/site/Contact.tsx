'use client';

import { FormEvent, useState } from 'react';
import SectionHeading from '@/components/site/SectionHeading';

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
		<section id="contact" className="container-md py-20">
			<SectionHeading title="Contact" />
			<div className="grid gap-10 md:grid-cols-2">
				<div>
					<p className="leading-relaxed">
						My inbox is always open — whether it&apos;s a role, a project, or just a question about something
						I&apos;ve built. I&apos;ll get back to you as soon as I can.
					</p>
					<a href={`mailto:${email}`} className="mt-4 inline-block font-mono text-sm text-accent hover:underline">
						{email}
					</a>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input name="email" type="email" required placeholder="Your email" className="input" />
					<input name="subject" type="text" required placeholder="Subject" className="input" />
					<textarea name="message" required placeholder="Message" rows={5} className="input resize-y" />
					<div className="flex items-center gap-4">
						<button type="submit" disabled={status === 'sending'} className="btn-primary">
							{status === 'sending' ? 'Sending…' : 'Send message'}
						</button>
						{status === 'sent' && <p className="text-sm text-accent">Sent — thanks for reaching out.</p>}
						{status === 'error' && <p className="text-sm text-red-400">Something went wrong. Email me directly instead.</p>}
					</div>
				</form>
			</div>
		</section>
	);
}
