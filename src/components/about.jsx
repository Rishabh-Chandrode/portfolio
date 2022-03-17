import React from 'react'
import "./about.css";
import photo from "./images/wphoto.jpeg"
import resume from "../Resume.pdf";


const About = () => {
    
    return (
       <div className="about">
           <div className="about-heading">ABOUT</div>
           <hr />

           <div className="about-content ">

                <div className="userpic">
                    <img src={photo} alt="userpic" />
                </div>

                <div className="info">
                Computer Science Engineering Student at UIT RGPV Bhopal.
                A competitive coder ,web developer(beginner),
                open source enthusiast.Effective Student committed to learning,
                developing skills in web development,
                competitive coding and team contribution.
                Self-directed and energetic with superior performance in both 
                autonomous or collaborative environments.
                </div>

           </div>
           <div className="btn btn-container">
               <a href={resume}><button>Download Resume</button></a>
               
           </div>

       </div>
    )
}

export default About
