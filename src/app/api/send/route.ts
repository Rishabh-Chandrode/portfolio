import { CHAT_MESSAGE_T } from '@Types/api/send';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request : Request) {
  try {
    const body = await request.json();
    const {email,subject,message} = body;
    let template;
    if(email=== 'form chatbot'){
      template = 
      `<div>
        ${email} 
        <br/>
        <br/>
        ${ message.map((chat: CHAT_MESSAGE_T)=>`<div>${chat.role} : ${chat.content}</div> <br/>`).join('')}
      </div>`;
    }else{
      template = 
      `<div>
        ${email} 
        <br/>
        <br/>
        ${ message }
      </div>`;
    }
    const data = await resend.emails.send({
      from: 'Portfolio@resend.dev',
      to: 'rishabhchandrode@gmail.com',
      subject: subject ,
      html: template,
    });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
