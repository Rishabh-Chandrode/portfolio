'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
	const router = useRouter();
	const [error, setError] = useState('');
	const [busy, setBusy] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const password = new FormData(event.currentTarget).get('password');
		setBusy(true);
		setError('');
		try {
			const res = await fetch('/api/admin/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password }),
			});
			if (res.ok) {
				router.replace('/admin');
				return;
			}
			const data = await res.json().catch(() => null);
			setError(data?.error ?? 'Login failed');
		} catch {
			setError('Login failed');
		} finally {
			setBusy(false);
		}
	}

	return (
		<main className="flex min-h-screen items-center justify-center px-6">
			<form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg border border-line bg-panel p-6">
				<h1 className="text-lg font-semibold text-zinc-100">Admin</h1>
				<p className="mt-1 text-sm text-zinc-500">Sign in to edit portfolio content.</p>
				<input
					name="password"
					type="password"
					required
					autoFocus
					placeholder="Password"
					className="input mt-5"
				/>
				{error && <p className="mt-2 text-sm text-red-400">{error}</p>}
				<button type="submit" disabled={busy} className="btn-primary mt-4 w-full">
					{busy ? 'Signing in…' : 'Sign in'}
				</button>
			</form>
		</main>
	);
}
