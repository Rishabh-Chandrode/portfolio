// import { EmailTemplate } from '../../../components/EmailTemplate';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;



export async function POST(req, res) {
  

  const data = await req.formData();
  console.log(data);
  const email = data.get('email');
  const subject = data.get('subject');
  const message = data.get('message');
  try {
    const data = await resend.emails.send({
      from: "Portfolio@resend.dev",
      to: 'rishabhchandrode@gmail.com',
      subject: subject ,
      html: `<div>
        ${email} 
        <br/>
        ${message}
      </div>`,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
