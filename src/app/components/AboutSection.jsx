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
            Hello I&apos;m Rishabh Chandrode, Senior student at University Institute of Technology RGPV Bhopal.
             Mainly skilled in  C++, JavaScript also proficient in data structures and algorithms. Have
            hands-on experience working on full stack projects based on technologies like React, Node.js, Express,
            MongoDB, SQL, FireBase, HTML, CSS etc. A team player and 
            excited to work with others to create amazing applications. 
          </p>
          
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection