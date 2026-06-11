import crypto from 'crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function sessionSecret(): string {
	// A dedicated secret is preferred; falling back to the password keeps
	// local setup down to a single env var.
	const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
	if (!secret) throw new Error('ADMIN_PASSWORD is not configured');
	return secret;
}

function sign(payload: string): string {
	return crypto.createHmac('sha256', sessionSecret()).update(payload).digest('base64url');
}

export function verifyPassword(candidate: string): boolean {
	const expected = process.env.ADMIN_PASSWORD;
	if (!expected) return false;
	const a = crypto.createHash('sha256').update(candidate).digest();
	const b = crypto.createHash('sha256').update(expected).digest();
	return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): { token: string; maxAge: number } {
	const expiresAt = Date.now() + SESSION_TTL_MS;
	return {
		token: `${expiresAt}.${sign(String(expiresAt))}`,
		maxAge: SESSION_TTL_MS / 1000,
	};
}

export function verifySessionToken(token: string | undefined): boolean {
	if (!token) return false;
	const [expiresAt, signature] = token.split('.');
	if (!expiresAt || !signature) return false;
	if (Number(expiresAt) < Date.now()) return false;
	try {
		return crypto.timingSafeEqual(Buffer.from(sign(expiresAt)), Buffer.from(signature));
	} catch {
		return false;
	}
}

export async function isAuthenticated(): Promise<boolean> {
	const store = await cookies();
	return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
