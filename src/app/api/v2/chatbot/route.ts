import { GoogleGenAI } from '@google/genai';
import { TEMPLATE } from './prompt';

const ai = new GoogleGenAI({ apiKey: process.env['GEMINI_API_KEY'] });

export async function POST(req: Request) {
	const { query, history } = await req.json();

	try {
		const chat = ai.chats.create({
			model: 'gemini-3-flash-preview',
			history: history,
			config: {
				systemInstruction: TEMPLATE,
			},
		});
		const response = await chat.sendMessage({
			message: query,
		});
		return Response.json({ message: response.text });
	} catch (err: any) {
		console.log(err);
		return Response.json({
			message: 'There is some problem connecting gemini',
		});
	}
}
