"use client";
import React, { useState, useMemo } from 'react'

import skills_data from '@/components/data/skills';
import "./Skills.css";

import dynamic from 'next/dynamic';


const MotionDiv = dynamic(() => import('./animations/MotionDiv'), { ssr: false });
const _AnimatePresence = dynamic(() => import('./animations/_AnimatePresence'), { ssr: false });


const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 }
};

const Skills = () => {
    const [currentCategory, setCurrentCategory] = useState('programming');
    const skills = useMemo(() => skills_data, []);

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

                <_AnimatePresence>
                    {skills[currentCategory].map((skill, index) => (
                        <MotionDiv
                            variants={cardVariants}
                            initial="initial"
                            animate={"animate"}
                            transition={{ duration: 0.5, delay: index * 0.1 }}

                            key={skill.name + index} className="skill-container   p-2 w-full md:w-1/4 sm:w-1/3 ">
                            <div className=' p-3 bg-white/[0.08] flex items-center rounded-sm h-14 box-border '>
                                <div className='px-1' >
                                    {skill.icon}
                                </div>
                                <h3>{skill.name}</h3>
                            </div>
                        </MotionDiv>

                    ))}
                </_AnimatePresence>

            </div>

        </section>


    )
}

export default Skills