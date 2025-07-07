"use client";
import {useState} from 'react'

const ContactForm = () => {

    const [emailSubmitted,setEmailSubmitted] = useState(false);
    const [userEmail,setUserEmail] = useState("");
    const [userSubject,setUserSubject] = useState("");
    const [userMessage,setUserMessage] = useState("");
    const [isSending,setIsSending] = useState(false);

    const handleSubmit = async (event :React.FormEvent<HTMLFormElement> )=> {
        event.preventDefault();
        setIsSending(true);
        const data = {
            email: userEmail,
            subject: userSubject,
            message: userMessage,
        }
        const JSONData = JSON.stringify(data);
        const endpoint = "/api/send";
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body:JSONData,
        }
        const response = await fetch(endpoint,options);
        const resData = await response.json();
        if(response.status === 200){
            console.log('Message Sent.')
            shownotification();
        }
        setIsSending(false);
    }

    const shownotification = () => {
        setUserEmail("");
        setUserSubject("");
        setUserMessage("");
        setEmailSubmitted(true);
        setTimeout(()=>{
            setEmailSubmitted(false)
        },5000)
    }

  return (
    <form action="" className='flex flex-col ' onSubmit={handleSubmit}>
    <div className='mb-6' >
        <label htmlFor="email" className='text-white block mb-2 text-sm font-medium ' >
            Email
        </label>
        <input 
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        type="email" 
        name="email" 
        id='email' 
        className=' bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-green-100 text-sm rounded-lg  block w-full p-2.5 ' 
        required 
        placeholder='xyz@email.com' />
    </div>



    <div className=' mb-6 '>
        <label htmlFor="subject" className='text-white block mb-2 text-sm font-medium ' >
            Subject
        </label>
        <input 
        type="text" 
        name="subject" 
        id='subject' 
        value={userSubject}
        onChange={(e) => setUserSubject(e.target.value)}
        className=' bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-green-100 text-sm rounded-lg  block w-full p-2.5 ' 
        required 
        placeholder='Just saying hi,' />
    </div>

    <div className='mb-6'>
        <label htmlFor="message" className='text-white block text-sm mb-2 font-medium' >Message</label>
        <textarea 
        name="message" 
        id="message" 
        cols={30} 
        rows={10} 
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-green-100 text-sm rounded-lg  block w-full p-2.5' 
        placeholder="let's talk about..." >
        </textarea>
    </div>

    <button type='submit' disabled={isSending}
        className='bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-5 rounded-lg w-full'
    >
        {isSending ? "Sending..." : "Send"}
    </button>
    {
        emailSubmitted && (
            <p className='text-green-500 text-sm  mt-2 ' >
                Email sent successfully.
            </p>
        )
    }

</form>
  )
}

export default ContactForm