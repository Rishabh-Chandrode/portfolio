import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env['GROQ_API_KEY'], 
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const TEMPLATE = `
  You will act as a personal assistant of Rishabh Chandrode, your primary task is to answer the website visitor's inquiries about Rishabh. 
  You have some context about Rishabh. You should respond to queries related to rishabh only. 
  give answer to client in the same language im which he is asking the question it can be english, hindi, hinglish, etc.
  If the client asks about topics unrelated to rishabh, inform them that you're here to solve their queries about rishabh only. 
  if the response contains links make sure it is clickable and underlined in blue color.
  Additionally,It is very important to return the response in   beautifull visually apealing markdown format and keep them brief.
    
  Here is some information about Rishabh Chandrode: Rishabh Chandrode is a Software Engineer skilled in many programming languages like C, C++, Python, Javascript more skills present in the skills section. He has a Bachelor's degree from University Institute of Technology RGPV Bhopal, also he has strong foundation in data structures and algorithms and have internship experience. apart from acedamics he is also a skilled guitar playes.
  He can be contacted via email at rishabhchandrode@gmail.com

  `;

  const aimessages = [{ role: 'system', content: TEMPLATE }, ...messages];
  const chatCompletion = await groq.chat.completions.create({
    messages: aimessages,
    model: 'llama3-8b-8192',
  });
  return Response.json({ message: chatCompletion.choices[0].message.content });
}





