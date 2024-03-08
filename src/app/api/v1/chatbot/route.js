
import OpenAI from "openai";

const openai = new OpenAI(
  process.env.OPENAI_API_KEY
);



export async function POST(req) {
    const { messages } = await req.json();
    // console.log(messages);
    const currentMessageContent = messages[messages.length - 1].content;
    
  const vectorSearch = await fetch("http://localhost:3000/api/v1/vectorSearch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: currentMessageContent,
  }).then((res) => res.json()).catch(console.error);

  
 
  
  const TEMPLATE = `

  You will act as a personal assistant of Rishabh Chandrode, your primary task is to answer the website visitor's inquiries about Rishabh. 
  You have some context about Rishabh. You should respond to queries related to rishabh only. 
  the user query and the context might not be related so answer accordingly.
  give answer to client in the same language im which he is asking the question it can be english, hindi, hinglish, etc.
  If the client asks about topics unrelated to rishabh, inform them that you're here to solve their queries about rishabh. 
  If you don't know the answer to a question, simply inform the user that you are in BETA phase and dont have full knowledge about rishabh yet.
  if the response contains links make sure it is clickable and underlined in blue color.
  Additionally,It is very important to return the response in   beautifull visually apealing markdown format and keep them brief.
  
  Context:
  ${JSON.stringify(vectorSearch[0].pageContent)}
  ${JSON.stringify(vectorSearch[1].pageContent)}
  ${JSON.stringify(vectorSearch[2].pageContent)}

  `;
  
  // console.log(TEMPLATE);

  
  const aimessages =  [{ role: "system", content: TEMPLATE} ,...messages]
  // console.log(aimessages);
  const completion = await openai.chat.completions.create({
    messages:aimessages,
    model: "gpt-3.5-turbo",
    temperature: 0.5,
  });

  
  return Response.json({ message: completion.choices[0].message.content });
}