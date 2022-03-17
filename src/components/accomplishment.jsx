import React from "react";
import "./accomplishment.css";

const Accomplishment = () => {
  return (
    <div className="accomplishment-section">
      <div className="accomplishment-container">
        <div className="project-container">
          <div className="secondary-heading">Projects</div>
          <ul className="info-lists">

            <li className="info-item">
                <a href="https://github.com/Rishabh-Chandrode/blogging"><strong>Bloging website</strong></a>
              
              <br />
              <span>A blogging website where u can create edit publish your own blog</span>
            </li>

            <li className="info-item">
            <a href="https://rishabh-chandrode.github.io/Lakeview/"><strong>Lakeview Country Club </strong></a>
               <br />
              <span>Single page golf club website describing its features and membership plans</span>
            </li>

            <li className="info-item">
            <a href="https://rishabh-chandrode.github.io/Lakeview/"><strong>Comercial website </strong></a>
               <br />
              <span>A comercial website for startup or small buisness</span>
            </li>
            

          </ul>
        </div>
        <div className="education-container">
          <div className="secondary-heading">education</div>

          <ul className="info-lists">

            <li className="info-item">
              <strong>B.Tech :: UIT RGPV BHOPAL </strong>
              <br />
              <span>Currently persuing bachelors degree in computer science and engineering</span>
            </li>

            <li className="info-item">
              <strong>Highschool :: Kendriya Vidhyalaya Khandwa</strong> <br />
              <span>Completed highschool in maths and science stream with 85% in 12th</span>
            </li>

            

          </ul>

        </div>
      </div>
    </div>
  );
};

export default Accomplishment;
