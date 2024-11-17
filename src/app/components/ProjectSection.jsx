"use client";
import React,{useState,useRef} from 'react'
import ProjectCard from './ProjectCard'
import ProjectTag from './ProjectTag'
import {motion, useInView} from "framer-motion";

import projects from '@/components/data/projects';

const cardVariants = {
    initial:{ y:50 , opacity:0 },
    animate:{y:0, opacity:1}
};


const ProjectSection = () => {
    const [tag,setTag] = useState("All")
    const ref = useRef(null);
    const isInView = useInView(ref,{once:false});
    const handleTagChange = (newtag) => {
        setTag(newtag);
    }

    const filteredProjects = projects.filter( (project) => 
        project.tag.includes(tag)
     )


  return (
    <section id='ProjectSection' className='pt-10 sm:text-sm' >
        <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12' >Projects</h2>
        <div className='text-white flex flex-row justify-center items-center gap-2 py-6 ' >
           <ProjectTag onClick={handleTagChange} name={"All"} isSelected={tag=="All"} />
           <ProjectTag onClick={handleTagChange} name={"Web"} isSelected={tag=="Web"} />
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
  )
}

export default ProjectSection