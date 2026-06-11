import { cookies } from 'next/headers';
import { createSessionToken, SESSION_COOKIE, verifyPassword } from '@/lib/auth';

export async function POST(request: Request) {
	const body = await request.json().catch(() => null);
	const password = typeof body?.password === 'string' ? body.password : '';

	if (!process.env.ADMIN_PASSWORD) {
		return Response.json({ error: 'Admin access is not configured on this deployment' }, { status: 503 });
	}
	if (!verifyPassword(password)) {
		return Response.json({ error: 'Incorrect password' }, { status: 401 });
	}

	const { token, maxAge } = createSessionToken();
	const store = await cookies();
	store.set(SESSION_COOKIE, token, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge,
	});
	return Response.json({ ok: true });
}
