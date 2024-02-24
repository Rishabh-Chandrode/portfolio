"use client";
import React,{useState} from 'react'
import GithubIcon from "../../../public/images/logos/github-icon.svg";
import LinkedinIcon from "../../../public/images/logos/linkedin-icon.svg"
import Link from 'next/link';
import Image from 'next/image';


const EmailSection = () => {
    const [emailSubmitted,setEmailSubmitted] = useState(false);
    const [userEmail,setUserEmail] = useState("");
    const [userSubject,setUserSubject] = useState("");
    const [userMessage,setUserMessage] = useState("");


    const handleSubmit = async (e)=> {
        e.preventDefault();
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
        <section id='EmailSection' className='grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative' >
            <div className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2'>

            </div>

            <div className='z-10'>
                <h5 className='text-xl font-bold text-white my-2 '>
                    Let&apos;s Connect
                </h5>
                <p className='text-[#ADB7BE] mb-4 max-w-md' >
                    I&apos;m looking for new opportunities, my inbox is always open,
                    whether you have a question or just want to say hi, I&apos;ll try
                    my best to reach you!
                </p>
                <div className='socials flex flex-row gap-2' >
                    <Link href={"https://github.com/Rishabh-Chandrode"} >
                        <Image src={GithubIcon} alt='Github Icon' />
                    </Link>
                    <Link href={"https://www.linkedin.com/in/rishabh-chandrode/"} >
                        <Image src={LinkedinIcon} alt='Linkedin Icon' ></Image>
                    </Link>
                    <Link href={"https://www.instagram.com/rishabh_chandrode/"} >
                    <img width="48" height="48" src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new"/>
                    </Link>
                    
                    
                </div>
            </div>

            <div  className='z-10 '>
                <form action="" className='flex flex-col ' onSubmit={handleSubmit}>
                    <div className='mb-6' >
                        <label htmlFor="email"  type="email" className='text-white block mb-2 text-sm font-medium ' >
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
                        <label htmlFor="subject"  type="text" className='text-white block mb-2 text-sm font-medium ' >
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
                        cols="30" 
                        rows="10" 
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-green-100 text-sm rounded-lg  block w-full p-2.5' 
                        placeholder="let's talk about..." >
                        </textarea>
                    </div>

                    <button type='submit'
                        className='bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full'
                    >
                        Send Message 
                    </button>
                    {
                        emailSubmitted && (
                            <p className='text-green-500 text-sm  mt-2 ' >
                                Email sent successfully.
                            </p>
                        )
                    }

                </form>
            </div>

        </section>
    )
}

export default EmailSection