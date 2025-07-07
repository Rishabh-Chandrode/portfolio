"use client";
import { useState } from 'react'
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";

import { SkillCategory } from '@Types/skills/skills';
import skills from '@Data/skills';

const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 }
};


const Skills = () => {
    const [currentCategory, setCurrentCategory] = useState<SkillCategory>('programming');
    return (
        <section id='skillsSection' className=' pt-11'>
            <div className="section-title font-bold text-2xl my-5 ">
                Skills
            </div>
            <div className='category flex flex-wrap'>
                <div onClick={() => setCurrentCategory('programming')} className={`${currentCategory === 'programming' ? 'bg-primary-500' : 'border-2 border-sky-500'} cursor-pointer inline rounded-md py-2 px-3 m-1 `} >Programming</div>
                <div onClick={() => setCurrentCategory('web')} className={`${currentCategory === 'web' ? 'bg-primary-500' : 'border-2 border-sky-500'} cursor-pointer inline rounded-md py-2 px-3 m-1 `} >Web</div>
                <div onClick={() => setCurrentCategory('db')} className={`${currentCategory === 'db' ? 'bg-primary-500' : 'border-2 border-sky-500'} cursor-pointer inline rounded-md py-2 px-3 m-1 `} >DB</div>
                <div onClick={() => setCurrentCategory('os')} className={`${currentCategory === 'os' ? 'bg-primary-500' : 'border-2 border-sky-500'} cursor-pointer inline rounded-md py-2 px-3 m-1 `} >OS</div>
                <div onClick={() => setCurrentCategory('misc')} className={`${currentCategory === 'misc' ? 'bg-primary-500' : 'border-2 border-sky-500'} cursor-pointer inline rounded-md py-2 px-3 m-1 `} >Miscellaneous</div>
            </div>

            <div className='skills flex flex-wrap' >
                <AnimatePresence>
                    {skills[currentCategory].map((skill, index) => (
                        <motion.div
                            variants={cardVariants}
                            initial="initial"
                            animate={"animate"}
                            transition={{ duration: 0.5, delay: index * 0.1 }}

                            key={skill.name + index} className="skill-container   p-2 w-full md:w-1/4 sm:w-1/3 ">
                            <div className=' p-3 bg-white/[0.08] flex items-center rounded-sm h-14 box-border '>
                                <div className='px-1' >
                                    <Image src={skill.icon} alt={`${skill.name} logo`} />
                                </div>
                                <h3>{skill.name}</h3>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Skills