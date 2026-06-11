'use client';

import { KeyboardEvent, ReactNode, useState } from 'react';

export function Field({ label, children }: { label: string; children: ReactNode }) {
	return (
		<label className="block">
			<span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</span>
			{children}
		</label>
	);
}

export function TextInput({
	value,
	onChange,
	placeholder,
}: {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}) {
	return (
		<input
			type="text"
			value={value}
			placeholder={placeholder}
			onChange={(event) => onChange(event.target.value)}
			className="input"
		/>
	);
}

export function TextArea({
	value,
	onChange,
	rows = 3,
}: {
	value: string;
	onChange: (value: string) => void;
	rows?: number;
}) {
	return (
		<textarea
			value={value}
			rows={rows}
			onChange={(event) => onChange(event.target.value)}
			className="input resize-y"
		/>
	);
}

/**
 * Tag-style editor for short string lists (skills, tech stacks). Type and
 * press Enter / comma / the Add button to add; click × on a chip to remove.
 */
export function TagListEditor({
	values,
	onChange,
	placeholder = 'Add…',
}: {
	values: string[];
	onChange: (values: string[]) => void;
	placeholder?: string;
}) {
	const [draft, setDraft] = useState('');

	function commit() {
		const items = draft
			.split(',')
			.map((item) => item.trim())
			.filter((item) => item && !values.includes(item));
		if (items.length) onChange([...values, ...items]);
		setDraft('');
	}

	function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' || event.key === ',') {
			event.preventDefault();
			commit();
		} else if (event.key === 'Backspace' && draft === '' && values.length) {
			onChange(values.slice(0, -1));
		}
	}

	return (
		<div className="flex flex-wrap items-center gap-1.5 rounded-md border border-line bg-panel p-2">
			{values.map((value, index) => (
				<span
					key={`${value}-${index}`}
					className="flex items-center gap-1 rounded border border-line bg-surface px-2 py-0.5 text-xs text-zinc-200"
				>
					{value}
					<button
						type="button"
						aria-label={`Remove ${value}`}
						onClick={() => onChange(values.filter((_, i) => i !== index))}
						className="text-zinc-500 transition-colors hover:text-red-400"
					>
						✕
					</button>
				</span>
			))}
			<input
				type="text"
				value={draft}
				placeholder={placeholder}
				onChange={(event) => setDraft(event.target.value)}
				onKeyDown={onKeyDown}
				onBlur={commit}
				className="min-w-28 flex-1 bg-transparent px-1 py-0.5 text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
			/>
			<button type="button" onClick={commit} disabled={!draft.trim()} className="btn-ghost h-7 px-2.5 text-xs">
				+ Add
			</button>
		</div>
	);
}

/** Editable list of multi-line strings with add / remove / reorder. */
export function StringListEditor({
	values,
	onChange,
	addLabel = 'Add item',
	rows = 2,
}: {
	values: string[];
	onChange: (values: string[]) => void;
	addLabel?: string;
	rows?: number;
}) {
	function update(index: number, value: string) {
		onChange(values.map((item, i) => (i === index ? value : item)));
	}

	function remove(index: number) {
		onChange(values.filter((_, i) => i !== index));
	}

	function move(index: number, direction: -1 | 1) {
		const target = index + direction;
		if (target < 0 || target >= values.length) return;
		const next = [...values];
		[next[index], next[target]] = [next[target], next[index]];
		onChange(next);
	}

	return (
		<div className="space-y-2">
			{values.map((value, index) => (
				<div key={index} className="flex gap-2">
					<textarea
						value={value}
						rows={rows}
						onChange={(event) => update(index, event.target.value)}
						className="input flex-1 resize-y"
					/>
					<div className="flex flex-col gap-1">
						<IconButton label="Move up" onClick={() => move(index, -1)} disabled={index === 0} glyph="↑" />
						<IconButton
							label="Move down"
							onClick={() => move(index, 1)}
							disabled={index === values.length - 1}
							glyph="↓"
						/>
						<IconButton label="Remove" onClick={() => remove(index)} glyph="✕" danger />
					</div>
				</div>
			))}
			<button type="button" onClick={() => onChange([...values, ''])} className="btn-ghost h-8 px-3 text-xs">
				+ {addLabel}
			</button>
		</div>
	);
}

export function IconButton({
	label,
	onClick,
	glyph,
	disabled,
	danger,
}: {
	label: string;
	onClick: () => void;
	glyph: string;
	disabled?: boolean;
	danger?: boolean;
}) {
	return (
		<button
			type="button"
			title={label}
			aria-label={label}
			onClick={onClick}
			disabled={disabled}
			className={`flex h-7 w-7 items-center justify-center rounded border border-line text-xs transition-colors disabled:opacity-30 ${
				danger ? 'text-red-400 hover:border-red-400/50' : 'text-zinc-400 hover:border-accent/50 hover:text-zinc-100'
			}`}
		>
			{glyph}
		</button>
	);
}

/** Card wrapper for one entry in a list section (a job, a project, …). */
export function EntryCard({
	title,
	index,
	total,
	onMove,
	onRemove,
	children,
}: {
	title: string;
	index: number;
	total: number;
	onMove: (index: number, direction: -1 | 1) => void;
	onRemove: (index: number) => void;
	children: ReactNode;
}) {
	return (
		<div className="rounded-lg border border-line bg-panel p-4">
			<div className="mb-4 flex items-center justify-between gap-3">
				<h3 className="truncate text-sm font-semibold text-zinc-200">{title || 'Untitled'}</h3>
				<div className="flex gap-1">
					<IconButton label="Move up" onClick={() => onMove(index, -1)} disabled={index === 0} glyph="↑" />
					<IconButton label="Move down" onClick={() => onMove(index, 1)} disabled={index === total - 1} glyph="↓" />
					<IconButton label="Remove" onClick={() => onRemove(index)} glyph="✕" danger />
				</div>
			</div>
			<div className="space-y-3">{children}</div>
		</div>
	);
}
