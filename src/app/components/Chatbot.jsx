"use client";
import React, { useRef, useEffect, useState } from 'react'
import Loader from './ui/Loader';
import Input from './ui/input';
import { AnimatePresence, motion, useInView } from "framer-motion";
import ReactMarkdown from "react-markdown";
import './Chatbot.css'
const cardVariants = {
  open:{ scale:1, x:0 , y:0,
   
  },
  close:{scale:0, x:150,y:200 
    
  }
};



const Chatbot = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const lastChatRef = useRef(null);
  const [chats, setChats] = useState([
    {
      role: 'assistant',
      content: 'hello, welcome to my website'
    }
  ]);


  async function askgpt(newmessages) {
    // const newmessages = [...chats , {role:'assistant',content:query}]
    // console.log(newmessages)
    const response = await fetch('/api/v1/chatbot', {
      method: 'POST',
      body: JSON.stringify({ messages: newmessages }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // console. log(response)
    const data = await response.json()
    // console.log(data)
    return data.message;

  }


  const handlesubmit = async (e) => {
    if (query === '') return
    e.preventDefault()
    // console.log(query)

    const newmessages = [...chats, { role: 'user', content: query }]
    setChats((chats) => [...chats, { role: 'user', content: query }])
    setQuery('')
    setIsLoading(true)
    const message = await askgpt(newmessages)

    // console.log(message)
    setIsLoading(false)
    setChats((chats) => [...chats, { role: 'assistant', content: message }])
  }

  useEffect(() => {
    if (lastChatRef.current) {
      lastChatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
  }, [chats]);


  const sendchats = async (e, currentChats)=> {

   

    const data = {
        email: "form chatbot",
        subject: "User chat history",
        message: currentChats,
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
    }
    return resData;
}




useEffect(() => {
  const handleBeforeUnload = async (event) => {
    event.preventDefault();
    
    const currentChats = chats;
    if(currentChats.length === 1) return;
    const res = await sendchats(event, currentChats);
    // console.log(res);
  };
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, [chats]);

 

  return (
    <div className={`chatbot-container fixed  z-20  bottom-4 right-4 flex flex-col-reverse items-end md:bottom-10 md:right-10`} >
      <div onClick={() => setChatbotOpen(!chatbotOpen)} className={`bot-icon cursor-pointer box-border m-2 mr-0 text-black flex justify-center items-center bg-[#724ae8] w-16 h-16 rounded-full ${chatbotOpen?"rounded-tr-none":""} `}>
        <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/chatbot.png" alt="chatbot" />
      </div>
      

      
      <motion.div 
       variants={cardVariants}
       
       animate={chatbotOpen?"open":"close"}
       transition={0.3}
      className={` flex flex-col text-black  chatbot box-border  h-96 w-72 relative rounded-lg rounded-br-none overflow-hidden bg-[#e8e8e8] ${chatbotOpen?"":"h-0 w-0"}  `}>
        <div className=' bg-[#724ae8] p-2' >Chat with me.. (BETA)</div>
        <div className='chats h-full flex flex-col overflow-scroll no-scrollbar' >
          {chats.map((chat, index) => (
            <motion.div key={index}
            
            className={`chat flex ${chat.role === "assistant" ? "self-start" : "self-end"} box-border p-1 `}>
              <div className={`content  bg-white box-border text-sm p-2 rounded-lg ${chat.role==='assistant'?"rounded-bl-none mr-16":"rounded-br-none ml-16"}`} >
              <ReactMarkdown>{chat.content}</ReactMarkdown>
                </div>
            </motion.div>
          ))}
          <div>

          {isLoading && <Loader />}
          </div>
          
          <div ref={lastChatRef} ></div>
        </div>
        <div className='user-input flex p-2 border-slate-100 '>
          <input className=' w-full h-full box-border p-2 bg-[#e8e8e8] border-none rounded-sm focus:outline-[#e8e8e8] '
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Type your message here'
            value={query}
            type="text" 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handlesubmit(e);
              }
            }}
            />


          <button onClick={handlesubmit}  >
            <img width="40" height="40" src="https://img.icons8.com/3d-fluency/100/paper-plane.png" alt="paper-plane" />
          </button>

        </div>
        
      </motion.div>
      
    </div>
  )
}

export default Chatbot