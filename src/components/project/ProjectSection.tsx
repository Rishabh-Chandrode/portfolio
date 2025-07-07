"use client";
import React,{useState,useRef} from 'react'
import ProjectCard from './ProjectCard'
import ProjectTag from './ProjectTag'
import {motion, useInView} from "framer-motion";

import projects from '@Data/projects';

const cardVariants = {
    initial:{ y:50 , opacity:0 },
    animate:{y:0, opacity:1}
};


const ProjectSection = () => {
    const [tag,setTag] = useState("All")
    const ref = useRef(null);
    const isInView = useInView(ref,{once:false});
    const handleTagChange = (newtag: string) => {
        setTag(newtag);
    };
    const is_selected = true;
    const buttonStyles = is_selected ? "text-white bg-primary-700" : "text-[#ABD7BE] border-slate-600 hover:border-white";
    const filteredProjects = projects.filter( (project) => {
        return project.tag.includes(tag)
    });

    return (
    <section id='ProjectSection' className='pt-10 sm:text-sm' >
        <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12' >Projects</h2>
        <div className='text-white flex flex-row justify-center items-center gap-2 py-6 ' >
           <button onClick={() => { handleTagChange("All")}} className={` ${tag=="All" ? "text-white bg-primary-700" : "text-[#ABD7BE] border-slate-600 hover:border-white"} rounded-full border-2  px-4 py-2 text-xl cursor-pointer`} >
                All
            </button>
            <button onClick={() => { handleTagChange("Web")}} className={` ${tag=="Web" ? "text-white bg-primary-700" : "text-[#ABD7BE] border-slate-600 hover:border-white"} rounded-full border-2  px-4 py-2 text-xl cursor-pointer`} >
                Web
            </button>
        </div>
        <div ref={ref} className='grid lg:grid-cols-2 md:grid-cols-1 gap-8 md:gap-12' >
            {filteredProjects.map( (project, index) => 
            (<motion.div variants={cardVariants} 
                initial="initial" 
                animate= {isInView? "animate":"initial" }
                transition={{duration:0.5 , delay:index*0.2}}
                key={index+project.title}
                >
                <ProjectCard  project={project} />
            </motion.div>)
             )}
        </div>
    </section>
)};

export default ProjectSection