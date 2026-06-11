'use client';

import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';

interface ChatMessage {
	role: 'user' | 'model';
	text: string;
}

export default function ChatWidget({ name }: { name: string }) {
	const firstName = name.split(' ')[0];
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
	}, [messages, loading, open]);

	async function send() {
		const query = input.trim();
		if (!query || loading) return;
		setInput('');
		const nextMessages: ChatMessage[] = [...messages, { role: 'user', text: query }];
		setMessages(nextMessages);
		setLoading(true);
		try {
			const res = await fetch('/api/v2/chatbot', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query,
					history: messages.map((message) => ({ role: message.role, parts: [{ text: message.text }] })),
				}),
			});
			const data = await res.json();
			setMessages([...nextMessages, { role: 'model', text: data.message ?? 'Something went wrong, try again.' }]);
		} catch {
			setMessages([...nextMessages, { role: 'model', text: 'Something went wrong, try again.' }]);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				aria-label={open ? 'Close chat' : `Chat with ${firstName}'s assistant`}
				className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-surface shadow-lg transition-transform hover:scale-105"
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
					{open ? (
						<path d="M6 6l12 12M18 6L6 18" />
					) : (
						<path d="M21 12a8 8 0 0 1-8 8H4l1.5-3A8 8 0 1 1 21 12Z" strokeLinejoin="round" />
					)}
				</svg>
			</button>

			{open && (
				<div className="fixed bottom-20 right-5 z-50 flex h-[26rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-line bg-panel shadow-2xl">
					<div className="border-b border-line px-4 py-3">
						<p className="text-sm font-semibold text-zinc-100">Ask about {firstName}</p>
						<p className="text-xs text-zinc-500">AI assistant — answers questions about my work</p>
					</div>

					<div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
						{messages.length === 0 && (
							<p className="text-sm text-zinc-500">
								Try “What does {firstName} work on?” or “What&apos;s his tech stack?”
							</p>
						)}
						{messages.map((message, index) => (
							<div
								key={index}
								className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
									message.role === 'user'
										? 'ml-auto bg-accent/15 text-zinc-100'
										: 'mr-auto border border-line bg-surface text-zinc-300 [&_a]:text-accent [&_a]:underline [&_li]:ml-4 [&_li]:list-disc'
								}`}
							>
								{message.role === 'model' ? <Markdown>{message.text}</Markdown> : message.text}
							</div>
						))}
						{loading && <p className="font-mono text-xs text-zinc-500">thinking…</p>}
					</div>

					<form
						onSubmit={(event) => {
							event.preventDefault();
							send();
						}}
						className="flex gap-2 border-t border-line p-3"
					>
						<input
							value={input}
							onChange={(event) => setInput(event.target.value)}
							placeholder="Ask a question…"
							className="input flex-1"
						/>
						<button type="submit" disabled={loading || !input.trim()} className="btn-primary px-3">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
								<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7Z" strokeLinejoin="round" />
							</svg>
						</button>
					</form>
				</div>
			)}
		</>
	);
}
