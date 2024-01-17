"use client";
import React, { useTransition, useState } from 'react'
import Image from 'next/image'
import TabButton from './TabButton';

const tabData = [
  {
    title:"skills",
    id:"skills",
    content:(
      <ul className='list-disc pl-2'>
        <li><strong>Programming:</strong> C, C++, Python, JavaScript, Java*.</li>
        <li><strong>Web Technologies:</strong> ReactJs, NodeJs, ExpressJS, EJS, HTML, CSS, Bootstrap.</li>
        <li><strong>Database Management:</strong> MySQL, MongoDB.</li>
        <li><strong>Operating System:</strong> Windows, Linux*.</li>
        <li><strong>Miscellaneous:</strong> Data Structures, Algorithms, CSV, Git, GitHub</li>
       
      </ul>
    )
  },
  {
    title:"education",
    id:"education",
    content:(
      <ul className='list-disc pl-2'>
        <li>B.Tech- UIT RGPV: Computer Science Engineer </li>
        <li>Highschool- Kendriya Vidhyalaya Khandwa </li>
      </ul>
    )
  },
  {
    title:"certifications",
    id:"certifications",
    content:(
      <ul className='list-disc pl-2'>
        <li>Persistance Martion Summer Internship Program</li>
        <li>Udemy Frontend Development Course</li>
      </ul>
    )
  }
]

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    })
  }


  return (
    <section className='text-white'>
      <div className=' md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 '>
        <Image src={"/images/AboutMeImg.jpg"}
          width={500}
          height={500}
        />
        <div className='mt-4 md:mt-0 text-left flex flex-col h-full' >
          <h2 className='text-4xl font-bold text-white mb-4' >About Me</h2>
          <p className='text-base lg:text-lg ' >
            My name is Rishabh Chandrode, Senior student at University Institute of Technology RGPV Bhopal
            . I am mainly skilled in C++, JavaScript also proficient in data structures and algorithms. I have
            hands-on experience working on full stack projects based on technologies like React, Node.js, Express,
            MongoDB, SQL, FireBase, HTML, CSS etc. Additionaly, I have achieved 3 rank in Intra-collage codeing competition
            I am quick learner looking to expand my knowledge and skill set. I am a team player and I am
            excited to work with others to create amazing applications. Apart from my acadimics I also enjoy playing guitar.
          </p>
          <div className='flex flex-row mt-8 ' >
            <TabButton selectTab={() => handleTabChange("skills")} active={tab === "skills"}>{" "}skills{" "}</TabButton>
            <TabButton selectTab={() => handleTabChange("education")} active={tab === "education"}>education</TabButton>
            <TabButton selectTab={() => handleTabChange("certifications")} active={tab === "certifications"}>Certifications</TabButton>
          </div>
          <div className='mt-8' >{tabData.find( (t) => t.id==tab ).content}</div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection