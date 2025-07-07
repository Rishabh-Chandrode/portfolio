'use client';
import React, { useRef, useEffect, useState } from 'react';
import {motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

import Loader from '@/src/components/shared/loader/Loader';

import Image from 'next/image';
import chatbot_image from '@Images/logos/chatbot_logo.png';
import send_icon from '@Images/logos/send.png';
import { ChatMessage } from '@/src/types/shared/types';

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
  const lastChatRef = useRef<HTMLDivElement | null>(null);
  const [chats, setChats] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'hello, welcome to my website'
    }
  ]);


  async function askgpt(newmessages: ChatMessage[]) {
    const response = await fetch('/api/v2/chatbot', {
      method: 'POST',
      body: JSON.stringify({ messages: newmessages }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.message;

  }


  const handlesubmit = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (query === '') return;
    e.preventDefault();
    const newmessages = [...chats, { role: 'user', content: query }];
    setChats((chats) => [...chats, { role: 'user', content: query }]);
    setQuery('');
    setIsLoading(true);
    const message = await askgpt(newmessages);
    setIsLoading(false);
    setChats((chats) => [...chats, { role: 'assistant', content: message }]);
  };

  useEffect(() => {
    if (lastChatRef.current) {
      lastChatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);


  const sendchats = async (currentChats: ChatMessage[])=> {
    const data = {
        email: 'form chatbot',
        subject: 'User chat history',
        message: currentChats,
    };
    const JSONData = JSON.stringify(data);
    const endpoint = '/api/send';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body:JSONData,
    };
    const response = await fetch(endpoint,options);
    const resData = await response.json();
    if(response.status === 200){
        console.log('Message Sent.');
    }
    return resData;
};

useEffect(() => {
  const handleBeforeUnload = async () => {
    const currentChats = chats;
    if(currentChats.length === 1) return;
    await sendchats(currentChats);
  };
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, [chats]);

  return (
    <div className={'chatbot-container fixed  z-20  bottom-4 right-4 flex flex-col-reverse items-end md:bottom-10 md:right-10'} >
      <div onClick={() => setChatbotOpen(!chatbotOpen)} className={`bot-icon cursor-pointer box-border m-2 mr-0 text-black flex justify-center items-center bg-[#724ae8] w-16 h-16 rounded-full ${chatbotOpen?'rounded-tr-none':''} `}>
        <Image src={chatbot_image} alt='chatbot_logo' width={50} height={50} />
      </div>
      
      <motion.div 
       variants={cardVariants}
       animate={chatbotOpen?'open':'close'}
       transition={{ duration: 0.3 }}
       className={` flex flex-col text-black  chatbot box-border   relative rounded-lg rounded-br-none overflow-hidden bg-[#e8e8e8] ${chatbotOpen?'h-96 w-72':'h-0 w-0'}  `}>
        <div className=' bg-[#724ae8] p-2' >Chat with me...</div>
        <div className='chats h-full flex flex-col overflow-scroll no-scrollbar' >
          {chats.map((chat, index) => (
            <motion.div key={index}
            className={`chat flex ${chat.role === 'assistant' ? 'self-start' : 'self-end'} box-border p-1 `}>
              <div className={`content  bg-white box-border text-sm p-2 rounded-lg ${chat.role==='assistant'?'rounded-bl-none mr-16':'rounded-br-none ml-16'}`} >
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
          <Image src={send_icon} alt='send_icon' width={50} height={50} />
          </button>

        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;