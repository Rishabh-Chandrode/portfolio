"use client";
import "./ResumeSection.css";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Education as Education_T } from "@Types/resume/education";
import { Experience as Experience_T } from "@Types/resume/experience";

import {
	Experiences as Experiences_D,
	Educations as Educations_D,
} from "@Data/resume";

import Education from "@Components/resume/Education";
import Experience from "@Components/resume/Experience";
import MotionDiv from "../Wrapper/Animations/MotionDiv";

const cardVariants = {
	initial: { x: 50, opacity: 0 },
	animate: { x: 0, opacity: 1 },
};

const ResumeSection = () => {
	const expref = useRef(null);
	const eduref = useRef(null);
	const isexpInView = useInView(expref, { once: false });
	const iseduInView = useInView(eduref, { once: false });

	return (
		<section id="resume" className="resume pt-10  ">
			<div className="container">
				<div className="section-title"></div>

				<div className="row">
					<div className="col-lg-6">
						<h3 ref={expref} className="resume-title">
							Professional Experience
						</h3>
						{Experiences_D.map((Experience_D: Experience_T) => (
							<MotionDiv
								variants={cardVariants}
								initial="initial"
								animate={isexpInView ? "animate" : "initial"}
								transition={{ duration: 0.5 }}
								className="resume-item"
							>
								<Experience Experience={Experience_D} />
							</MotionDiv>
						))}
					</div>

					<div className="col-lg-6">
						<h3 ref={eduref} className="resume-title">
							Education
						</h3>
						{Educations_D.map((Education_D: Education_T) => (
							<MotionDiv
								variants={cardVariants}
								initial="initial"
								animate={iseduInView ? "animate" : "initial"}
								transition={{ duration: 0.5 }}
								className="resume-item"
							>
								<Education Education={Education_D} />
							</MotionDiv>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ResumeSection;
