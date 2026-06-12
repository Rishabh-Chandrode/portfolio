import { Redis } from '@upstash/redis';
import { promises as fs } from 'fs';
import path from 'path';

const redis = new Redis({
	url: process.env.portfolio_KV_REST_API_URL!,
	token: process.env.portfolio_KV_REST_API_TOKEN!,
});

const REDIS_KEY = 'portfolio';

export interface Social {
	label: string;
	url: string;
}

export interface Profile {
	name: string;
	role: string;
	headline: string;
	summary: string;
	about: string[];
	email: string;
	location: string;
	resumeUrl: string;
	avatar: string;
	socials: Social[];
}

export interface Experience {
	company: string;
	role: string;
	start: string;
	end: string;
	location: string;
	points: string[];
}

export interface Education {
	institution: string;
	degree: string;
	start: string;
	end: string;
}

export interface SkillGroup {
	category: string;
	items: string[];
}

export interface Project {
	title: string;
	description: string;
	tech: string[];
	github: string;
	live: string;
	image: string;
	featured: boolean;
}

export interface PortfolioContent {
	profile: Profile;
	experience: Experience[];
	education: Education[];
	skills: SkillGroup[];
	projects: Project[];
}

const CONTENT_FILE = path.join(process.cwd(), 'content', 'portfolio.json');

export async function getContent(): Promise<PortfolioContent> {
	const cached = await redis.get<PortfolioContent>(REDIS_KEY);
	if (cached) return cached;

	// First run: seed Redis from the local JSON file
	const raw = await fs.readFile(CONTENT_FILE, 'utf-8');
	const content = JSON.parse(raw) as PortfolioContent;
	await redis.set(REDIS_KEY, content);
	return content;
}

export async function saveContent(content: PortfolioContent): Promise<void> {
	await redis.set(REDIS_KEY, content);
}

class ValidationError extends Error {}

function str(value: unknown, field: string): string {
	if (typeof value !== 'string') throw new ValidationError(`"${field}" must be a string`);
	return value.trim();
}

function strArray(value: unknown, field: string): string[] {
	if (!Array.isArray(value)) throw new ValidationError(`"${field}" must be an array`);
	return value.map((item, i) => str(item, `${field}[${i}]`)).filter(Boolean);
}

function objArray<T>(value: unknown, field: string, parse: (item: Record<string, unknown>, field: string) => T): T[] {
	if (!Array.isArray(value)) throw new ValidationError(`"${field}" must be an array`);
	return value.map((item, i) => {
		if (typeof item !== 'object' || item === null) throw new ValidationError(`"${field}[${i}]" must be an object`);
		return parse(item as Record<string, unknown>, `${field}[${i}]`);
	});
}

/**
 * Parses an untrusted body (e.g. from the admin API) into a PortfolioContent,
 * dropping any unknown fields. Throws ValidationError with a readable message.
 */
export function parseContent(body: unknown): PortfolioContent {
	if (typeof body !== 'object' || body === null) throw new ValidationError('content must be an object');
	const root = body as Record<string, unknown>;

	const profileRaw = root.profile;
	if (typeof profileRaw !== 'object' || profileRaw === null) throw new ValidationError('"profile" must be an object');
	const p = profileRaw as Record<string, unknown>;

	return {
		profile: {
			name: str(p.name, 'profile.name'),
			role: str(p.role, 'profile.role'),
			headline: str(p.headline, 'profile.headline'),
			summary: str(p.summary, 'profile.summary'),
			about: strArray(p.about, 'profile.about'),
			email: str(p.email, 'profile.email'),
			location: str(p.location, 'profile.location'),
			resumeUrl: str(p.resumeUrl, 'profile.resumeUrl'),
			avatar: str(p.avatar, 'profile.avatar'),
			socials: objArray(p.socials, 'profile.socials', (item, field) => ({
				label: str(item.label, `${field}.label`),
				url: str(item.url, `${field}.url`),
			})),
		},
		experience: objArray(root.experience, 'experience', (item, field) => ({
			company: str(item.company, `${field}.company`),
			role: str(item.role, `${field}.role`),
			start: str(item.start, `${field}.start`),
			end: str(item.end, `${field}.end`),
			location: str(item.location, `${field}.location`),
			points: strArray(item.points, `${field}.points`),
		})),
		education: objArray(root.education, 'education', (item, field) => ({
			institution: str(item.institution, `${field}.institution`),
			degree: str(item.degree, `${field}.degree`),
			start: str(item.start, `${field}.start`),
			end: str(item.end, `${field}.end`),
		})),
		skills: objArray(root.skills, 'skills', (item, field) => ({
			category: str(item.category, `${field}.category`),
			items: strArray(item.items, `${field}.items`),
		})),
		projects: objArray(root.projects, 'projects', (item, field) => ({
			title: str(item.title, `${field}.title`),
			description: str(item.description, `${field}.description`),
			tech: strArray(item.tech, `${field}.tech`),
			github: str(item.github ?? '', `${field}.github`),
			live: str(item.live ?? '', `${field}.live`),
			image: str(item.image ?? '', `${field}.image`),
			featured: Boolean(item.featured),
		})),
	};
}

export { ValidationError };
