import { revalidatePath } from 'next/cache';
import { isAuthenticated } from '@/lib/auth';
import { getContent, parseContent, saveContent, ValidationError } from '@/lib/content';

export async function GET() {
	if (!(await isAuthenticated())) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}
	return Response.json(await getContent());
}

export async function PUT(request: Request) {
	if (!(await isAuthenticated())) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const body = await request.json().catch(() => null);
	try {
		const content = parseContent(body);
		await saveContent(content);
		revalidatePath('/');
		return Response.json({ ok: true });
	} catch (error) {
		if (error instanceof ValidationError) {
			return Response.json({ error: error.message }, { status: 400 });
		}
		console.error('failed to save content:', error);
		return Response.json({ error: 'Failed to save content' }, { status: 500 });
	}
}
