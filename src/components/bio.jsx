import React from "react";
import "./bio.css";

const Bio = () => {
  return (
    <div className="bio-section">
      <div className="bio-container">
        <div className="info-container">
          <div className="secondary-heading">Personal Info</div>
          <hr />
          <ul className="info-lists">
            <li className="info-item">
              <strong>NAME:-</strong>
              <br />
              <span>Rishabh Chandrode</span>
            </li>
            <li className="info-item">
              <strong>Birth Date:</strong> <br />
              <span>August 26,2002</span>
            </li>
            <li className="info-item">
              <strong>Profession:</strong> <br />
              <span>Student</span>
            </li>

            <li className="info-item">
              <strong>Email:</strong> <br />
              <span>rishabhchandrode@gmail.com</span>
            </li>
          </ul>
        </div>
        <div className="skill-container">
          <div className="secondary-heading">Skills</div>

          {/* ------------------------------------------------------------------------------- */}

          <div class="skills">
            <hr />
            <div class="skills-bar">

              <div class="bar">
                <div class="info">
                  <span>NODE.JS</span>
                </div>
                <div class="progress-line">
                  <span class="node"></span>
                </div>

                <div class="bar">
                  <div class="info">
                    <span>C++</span>
                  </div>
                  <div class="progress-line">
                    <span class="clang"></span>
                  </div>

                  <div class="bar">
                    <div class="info">
                      <span>REACT.JS</span>
                    </div>
                    <div class="progress-line">
                      <span class="react"></span>
                    </div>

                    <div class="bar">
                      <div class="info">
                        <span>HTML</span>
                      </div>
                      <div class="progress-line">
                        <span class="html"></span>
                      </div>
                      
                      <div class="bar">
                        <div class="info">
                          <span>CSS</span>
                        </div>
                        <div class="progress-line">
                          <span class="css"></span>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default Bio;
