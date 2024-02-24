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
              <h5>2024 - Present</h5>
              <p><em>RapidQuest, Pune India </em></p>
              
              <ul className='list-disc pl-2 '>
                <li > Developed and implemented a chatbot feature utilizing OpenAI API for natural language processing on customized AI
                  models, enhancing user engagement and interaction within the application.</li>
                  <div ref={expref} ></div>
                <li>Deployed Full stack python application using flask framework for seamless communication and data handling, ensuring
                  efficient performance and responsiveness.</li>
                 
                <li>Improved chatbot performance by 30% through fine-tuning techniques, resulting in a 20% increase in user engagement and
                  satisfaction.</li>
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