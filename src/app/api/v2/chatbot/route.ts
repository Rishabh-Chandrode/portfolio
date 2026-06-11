import { GoogleGenAI } from '@google/genai';
import { getContent } from '@/lib/content';
import { buildSystemPrompt } from './prompt';

export async function POST(request: Request) {
	const { query, history } = await request.json();

	if (!process.env.GEMINI_API_KEY) {
		return Response.json({ message: 'The assistant is not configured on this deployment.' }, { status: 503 });
	}

	try {
		const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
		const content = await getContent();
		const chat = ai.chats.create({
			model: 'gemini-3-flash-preview',
			history,
			config: {
				systemInstruction: buildSystemPrompt(content),
			},
		});
		const response = await chat.sendMessage({ message: query });
		return Response.json({ message: response.text });
	} catch (error) {
		console.error('chatbot request failed:', error);
		return Response.json({ message: 'I had trouble answering that — please try again.' }, { status: 502 });
	}
}
