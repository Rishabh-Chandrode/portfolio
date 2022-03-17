import React from 'react'
import "./header.css";
import { FaFacebookSquare ,FaInstagramSquare,FaTwitterSquare,FaLinkedin,FaGithubSquare } from "react-icons/fa";

const Header = () => {
    return (
        <div className="intro">
            <div className="intro-content">
                <div className="secondary-heading">
                    Hello, everyone <br></br> I'm
                </div>
                <div className="name-heading">
                    RISHABH CHANDRODE 
                </div>
                <div className="work-heading">
                    STUDENT  ||  WEB DEVELOPER  ||  COMPETITIVE CODER
                </div>
                <div className="social-icons">
                    <ul className='social-icon-list'>
                        <li className="facebook-icon"><a href="https://www.facebook.com/profile.php?id=100055973283017"><FaFacebookSquare /></a></li>
                        <li className="facebook-icon"><a href="https://twitter.com/Rishabh_202"><FaTwitterSquare /></a></li>
                        <li className="facebook-icon"><a href="https://www.instagram.com/rishabh_chandrode/"><FaInstagramSquare /></a></li>
                        <li className="facebook-icon"><a href="https://www.linkedin.com/in/rishabh-chandrode-2b555920a/"><FaLinkedin /></a></li>
                        <li className="facebook-icon"><a href="https://github.com/Rishabh-Chandrode"><FaGithubSquare /></a></li>
                    </ul>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Header
