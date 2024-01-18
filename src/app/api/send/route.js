import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(request) {
  try {
    const body = await request.json();
    const {email,subject,message} = body;
    const data = await resend.emails.send({
      from: "Portfolio@resend.dev",
      to: 'rishabhchandrode@gmail.com',
      subject: subject ,
      html: `<div>
        ${email} 
        <br/>
        <br/>
        ${message}
      </div>`,
    });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
