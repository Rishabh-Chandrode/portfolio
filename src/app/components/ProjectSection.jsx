"use client";
import React,{useState} from 'react'
import ProjectCard from './ProjectCard'
import ProjectTag from './ProjectTag'

const projects = [
    {
        id:1,
        title:"Vchat",
        description:"social media web app",
        imageUrl:"/images/projects/vchat1.png",
        giturl:"https://github.com/Rishabh-Chandrode/VChat",
        liveurl:"/",
        tag:["All","Web"]
    },
    {
        id:2,
        title:"Lakeview",
        description:"Country club website",
        imageUrl:"/images/projects/lakeview.png",
        giturl:"https://github.com/Rishabh-Chandrode/Lakeview",
        liveurl:"https://rishabh-chandrode.github.io/Lakeview/",
        tag:["All","Web"]
    },
    {
        id:3,
        title:"PSpot",
        description:"Parking space manager",
        imageUrl:"/images/projects/pspot.png",
        giturl:"https://github.com/Rishabh-Chandrode/PSpot",
        liveurl:"/",
        tag:["All","Web"]
    },
    {
        id:4,
        title:"Blogs",
        description:"Blogging platform",
        imageUrl:"/images/projects/default.jpg",
        giturl:"https://github.com/Rishabh-Chandrode/blogging",
        liveurl:"/",
        tag:["All","Web"]
    },
    {
        id:5,
        title:"BizzWhizz",
        description:"Company portfolio",
        imageUrl:"/images/projects/bizzwizz2.png",
        giturl:"https://github.com/Rishabh-Chandrode/company",
        liveurl:"https://rishabh-chandrode.github.io/company/",
        tag:["All","Web"]
    },
]

const ProjectSection = () => {

    const [tag,setTag] = useState("All")

    const handleTagChange = (newtag) => {
        setTag(newtag);
    }

    const filteredProjects = projects.filter( (project) => 
        project.tag.includes(tag)
     )


  return (
    <section>
        <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12' >Projects</h2>
        <div className='text-white flex flex-row justify-center items-center gap-2 py-6 ' >
           <ProjectTag onClick={handleTagChange} name={"All"} isSelected={tag=="All"} />
           <ProjectTag onClick={handleTagChange} name={"Web"} isSelected={tag=="Web"} />
        </div>
        <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-8 md:gap-12' >
            {filteredProjects.map( (project) => 
                <ProjectCard key={project.id} project={project} />
             )}
        </div>
    </section>
  )
}

export default ProjectSection