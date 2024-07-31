"use client";
import './EducationSection.css'
import React, { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion, useInView } from "framer-motion";

const cardVariants = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 }
};

const EducationSection = () => {

  const expref = useRef(null);
  const eduref = useRef(null);
  const isexpInView = useInView(expref, { once: false });
  const iseduInView = useInView(eduref, { once: false });

  return (
    <section id="resume" className="resume pt-10  ">
      <div className="container">

        <div className="section-title">
        </div>

        <div className="row">

          <div className="col-lg-6">
            <h3 ref={expref} className="resume-title">Professional Experience</h3>
            <motion.div
              variants={cardVariants}
              initial="initial"
              animate={isexpInView ? "animate" : "initial"}
              transition={{ duration: 0.5 }}
              className="resume-item">
              <h4>Software Development Engineer</h4>
              <h5>01/2024 - 04/2024</h5>
              <p><em>RapidQuest, Pune India </em></p>
              
              <ul className='list-disc pl-2 '>
                <li >Developed a customizable chatbot platform using Python Flask and Jinja templating engine, enabling users to create and personalize their own chatbots in 50 % less time compared to traditional methods.</li>
                  <div ref={expref} ></div>
                <li>Implemented a retrieval system leveraging RAG architecture and a MongoDB database, reducing chatbot response time by 20% through efficient data access.</li>
                 
                <li>Integrated OpenAI&apos;s ChatGPT 3.5 model for advanced natural language processing, achieving a high user satisfaction rating of 85% on chatbot responses.</li>
                <li>Deployed and debugged the chatbot application on the AWS cloud platform, ensuring an uptime exceeding 99.5% for user access.</li>
              </ul>

            </motion.div>
            
          </div>

          <div className="col-lg-6">


            <h3 ref={eduref} className="resume-title">Education</h3>
            <motion.div
              variants={cardVariants}
              initial="initial"
              animate={iseduInView ? "animate" : "initial"}
              transition={{ duration: 0.5 }}
              className="resume-item">
              <h4>B.Tech - Computer Science and Engineering</h4>
              <h5>2020 - 2024</h5>
              <p><em>University Institute of Technology, RGPV Bhopal</em></p>
              {/* <p>Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit. Ea vero voluptatum qui ut dignissimos deleniti nerada porti sand markend</p> */}
            </motion.div>
            <motion.div
              variants={cardVariants}
              initial="initial"
              animate={iseduInView ? "animate" : "initial"}
              transition={{ duration: 0.5 }}
              className="resume-item">
              <h4>HighSchool</h4>
              <h5>2017 - 2019</h5>
              <p><em>Kendriya Vidyalaya Khandwa</em></p>
              {/* <p>Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis et quis Eius vel ratione eius unde vitae rerum voluptates asperiores voluptatem Earum molestiae consequatur neque etlon sader mart dila</p> */}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default EducationSection