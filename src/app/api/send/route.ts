import { Resend } from 'resend';
import { getContent } from '@/lib/content';


function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
	const body = await request.json().catch(() => null);
	const email = typeof body?.email === 'string' ? body.email.trim() : '';
	const subject = typeof body?.subject === 'string' ? body.subject.trim() : '';
	const message = typeof body?.message === 'string' ? body.message.trim() : '';

	if (!email || !subject || !message) {
		return Response.json({ error: 'email, subject and message are required' }, { status: 400 });
	}
	if (!process.env.RESEND_API_KEY) {
		return Response.json({ error: 'email sending is not configured' }, { status: 503 });
	}

	try {
		const resend = new Resend(process.env.RESEND_API_KEY);
		const { profile } = await getContent();
		const { error } = await resend.emails.send({
			from: 'Portfolio <portfolio@resend.dev>',
			to: profile.email,
			reply_to: email,
			subject: `[Portfolio] ${subject}`,
			html: `<p><strong>From:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
		});
		if (error) throw error;
		return Response.json({ ok: true });
	} catch (error) {
		console.error('contact form send failed:', error);
		return Response.json({ error: 'failed to send' }, { status: 502 });
	}
}
