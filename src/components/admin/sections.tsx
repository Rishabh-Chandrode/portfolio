'use client';

import { Education, Experience, Profile, Project, SkillGroup } from '@/lib/content';
import { EntryCard, Field, StringListEditor, TagListEditor, TextArea, TextInput } from '@/components/admin/fields';

function useListOps<T>(items: T[], onChange: (items: T[]) => void) {
	return {
		update(index: number, patch: Partial<T>) {
			onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
		},
		move(index: number, direction: -1 | 1) {
			const target = index + direction;
			if (target < 0 || target >= items.length) return;
			const next = [...items];
			[next[index], next[target]] = [next[target], next[index]];
			onChange(next);
		},
		remove(index: number) {
			onChange(items.filter((_, i) => i !== index));
		},
		add(item: T) {
			onChange([...items, item]);
		},
	};
}

export function ProfileSection({ profile, onChange }: { profile: Profile; onChange: (profile: Profile) => void }) {
	const socials = useListOps(profile.socials, (next) => onChange({ ...profile, socials: next }));

	return (
		<div className="space-y-4">
			<div className="grid gap-4 sm:grid-cols-2">
				<Field label="Name">
					<TextInput value={profile.name} onChange={(name) => onChange({ ...profile, name })} />
				</Field>
				<Field label="Role">
					<TextInput value={profile.role} onChange={(role) => onChange({ ...profile, role })} />
				</Field>
				<Field label="Email">
					<TextInput value={profile.email} onChange={(email) => onChange({ ...profile, email })} />
				</Field>
				<Field label="Location">
					<TextInput value={profile.location} onChange={(location) => onChange({ ...profile, location })} />
				</Field>
				<Field label="Resume URL">
					<TextInput value={profile.resumeUrl} onChange={(resumeUrl) => onChange({ ...profile, resumeUrl })} />
				</Field>
				<Field label="Avatar image path">
					<TextInput value={profile.avatar} onChange={(avatar) => onChange({ ...profile, avatar })} />
				</Field>
			</div>
			<Field label="Headline (hero, one line)">
				<TextInput value={profile.headline} onChange={(headline) => onChange({ ...profile, headline })} />
			</Field>
			<Field label="Summary (hero, short paragraph)">
				<TextArea value={profile.summary} onChange={(summary) => onChange({ ...profile, summary })} />
			</Field>
			<Field label="About paragraphs">
				<StringListEditor
					values={profile.about}
					onChange={(about) => onChange({ ...profile, about })}
					addLabel="Add paragraph"
					rows={3}
				/>
			</Field>

			<h3 className="pt-2 text-sm font-semibold text-zinc-200">Social links</h3>
			<p className="text-xs text-zinc-500">
				Label controls the icon — GitHub, LinkedIn, LeetCode, Instagram and Mail are recognised.
			</p>
			{profile.socials.map((social, index) => (
				<div key={index} className="flex items-end gap-2">
					<div className="w-36">
						<Field label="Label">
							<TextInput value={social.label} onChange={(label) => socials.update(index, { label })} />
						</Field>
					</div>
					<div className="flex-1">
						<Field label="URL">
							<TextInput value={social.url} onChange={(url) => socials.update(index, { url })} />
						</Field>
					</div>
					<button type="button" onClick={() => socials.remove(index)} className="btn-ghost h-9 px-3 text-xs text-red-400">
						Remove
					</button>
				</div>
			))}
			<button type="button" onClick={() => socials.add({ label: '', url: '' })} className="btn-ghost h-8 px-3 text-xs">
				+ Add link
			</button>
		</div>
	);
}

export function ExperienceSection({
	experience,
	onChange,
}: {
	experience: Experience[];
	onChange: (experience: Experience[]) => void;
}) {
	const jobs = useListOps(experience, onChange);

	return (
		<div className="space-y-4">
			{experience.map((job, index) => (
				<EntryCard
					key={index}
					title={job.company ? `${job.role || 'Role'} @ ${job.company}` : job.role}
					index={index}
					total={experience.length}
					onMove={jobs.move}
					onRemove={jobs.remove}
				>
					<div className="grid gap-3 sm:grid-cols-2">
						<Field label="Company">
							<TextInput value={job.company} onChange={(company) => jobs.update(index, { company })} />
						</Field>
						<Field label="Role">
							<TextInput value={job.role} onChange={(role) => jobs.update(index, { role })} />
						</Field>
						<Field label="Start">
							<TextInput value={job.start} onChange={(start) => jobs.update(index, { start })} placeholder="Sep 2024" />
						</Field>
						<Field label="End">
							<TextInput value={job.end} onChange={(end) => jobs.update(index, { end })} placeholder="Present" />
						</Field>
					</div>
					<Field label="Location">
						<TextInput value={job.location} onChange={(location) => jobs.update(index, { location })} />
					</Field>
					<Field label="Highlights">
						<StringListEditor
							values={job.points}
							onChange={(points) => jobs.update(index, { points })}
							addLabel="Add highlight"
						/>
					</Field>
				</EntryCard>
			))}
			<button
				type="button"
				onClick={() => jobs.add({ company: '', role: '', start: '', end: '', location: '', points: [] })}
				className="btn-ghost"
			>
				+ Add experience
			</button>
		</div>
	);
}

export function EducationSection({
	education,
	onChange,
}: {
	education: Education[];
	onChange: (education: Education[]) => void;
}) {
	const entries = useListOps(education, onChange);

	return (
		<div className="space-y-4">
			{education.map((entry, index) => (
				<EntryCard
					key={index}
					title={entry.degree}
					index={index}
					total={education.length}
					onMove={entries.move}
					onRemove={entries.remove}
				>
					<Field label="Degree">
						<TextInput value={entry.degree} onChange={(degree) => entries.update(index, { degree })} />
					</Field>
					<Field label="Institution">
						<TextInput value={entry.institution} onChange={(institution) => entries.update(index, { institution })} />
					</Field>
					<div className="grid gap-3 sm:grid-cols-2">
						<Field label="Start">
							<TextInput value={entry.start} onChange={(start) => entries.update(index, { start })} />
						</Field>
						<Field label="End">
							<TextInput value={entry.end} onChange={(end) => entries.update(index, { end })} />
						</Field>
					</div>
				</EntryCard>
			))}
			<button
				type="button"
				onClick={() => entries.add({ institution: '', degree: '', start: '', end: '' })}
				className="btn-ghost"
			>
				+ Add education
			</button>
		</div>
	);
}

export function SkillsSection({ skills, onChange }: { skills: SkillGroup[]; onChange: (skills: SkillGroup[]) => void }) {
	const groups = useListOps(skills, onChange);

	return (
		<div className="space-y-4">
			{skills.map((group, index) => (
				<EntryCard
					key={index}
					title={group.category}
					index={index}
					total={skills.length}
					onMove={groups.move}
					onRemove={groups.remove}
				>
					<Field label="Category">
						<TextInput value={group.category} onChange={(category) => groups.update(index, { category })} />
					</Field>
					<Field label="Skills">
						<TagListEditor
							values={group.items}
							onChange={(items) => groups.update(index, { items })}
							placeholder="Add skill…"
						/>
					</Field>
				</EntryCard>
			))}
			<button type="button" onClick={() => groups.add({ category: '', items: [] })} className="btn-ghost">
				+ Add skill group
			</button>
		</div>
	);
}

export function ProjectsSection({
	projects,
	onChange,
}: {
	projects: Project[];
	onChange: (projects: Project[]) => void;
}) {
	const entries = useListOps(projects, onChange);

	return (
		<div className="space-y-4">
			{projects.map((project, index) => (
				<EntryCard
					key={index}
					title={project.title}
					index={index}
					total={projects.length}
					onMove={entries.move}
					onRemove={entries.remove}
				>
					<div className="grid gap-3 sm:grid-cols-2">
						<Field label="Title">
							<TextInput value={project.title} onChange={(title) => entries.update(index, { title })} />
						</Field>
						<Field label="Tech stack">
							<TagListEditor
								values={project.tech}
								onChange={(tech) => entries.update(index, { tech })}
								placeholder="Add tech…"
							/>
						</Field>
						<Field label="GitHub URL">
							<TextInput value={project.github} onChange={(github) => entries.update(index, { github })} />
						</Field>
						<Field label="Live URL">
							<TextInput value={project.live} onChange={(live) => entries.update(index, { live })} />
						</Field>
					</div>
					<Field label="Description">
						<TextArea value={project.description} onChange={(description) => entries.update(index, { description })} />
					</Field>
					<Field label="Image path (under /public, e.g. /images/projects/foo.webp)">
						<TextInput value={project.image} onChange={(image) => entries.update(index, { image })} />
					</Field>
					<label className="flex items-center gap-2 text-sm text-zinc-300">
						<input
							type="checkbox"
							checked={project.featured}
							onChange={(event) => entries.update(index, { featured: event.target.checked })}
							className="h-4 w-4 accent-[#4cc38a]"
						/>
						Featured (shown with image in the top grid)
					</label>
				</EntryCard>
			))}
			<button
				type="button"
				onClick={() =>
					entries.add({ title: '', description: '', tech: [], github: '', live: '', image: '', featured: false })
				}
				className="btn-ghost"
			>
				+ Add project
			</button>
		</div>
	);
}
