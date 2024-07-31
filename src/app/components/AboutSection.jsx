"use client";
import React, { useTransition, useState } from 'react'
import Image from 'next/image'
import TabButton from './TabButton';
import { motion } from "framer-motion"



const tabData = [
 
]

const AboutSection = () => {
  const [tab, setTab] = useState("certifications");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    })
  }


  return (
    <section id='AboutSection' className='text-white'>
      <div className=' md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 '>
        <motion.div
          className='overflow-hidden'
          initial = {{x:-200,opacity:0 }}
          animate={{x:0,opacity:1}}
          transition={{duration:0.5}}
        >
        <Image src={"/images/AboutMeImg.jpg"}
          width={500} 
          height={500}
        />
        </motion.div>
        <motion.div 
          initial = {{scale:0,opacity:0 }}
          animate={{scale:1,opacity:1}}
          transition={{duration:0.5}}
        className='mt-4 md:mt-0 text-left flex flex-col h-full' >
          <h2 className='text-4xl font-bold text-white mb-4' >About Me</h2>
          <p className='text-base lg:text-lg ' >
          I&apos;m Rishabh, a software engineer with a melody in my heart and a mind for algorithms. By day, I build awesome web applications using the fullstack approach, and I&apos;m constantly sharpening my skills with data structures and algorithms. When I&apos;m not glued to the screen, you&apos;ll find me jamming out on my guitar, music is my way to unwind and unleash my creativity after a day of coding challenges. Whether it&apos;s tackling a complex problem with the perfect data structure or composing a sweet riff, I&apos;m passionate about making something cool!
          </p>
          
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection