'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { EDUCATION_T } from '@Types/resume/education';
import { EXPERIENCE_T } from '@Types/resume/experience';

import {
	Experiences as Experiences_D,
	Educations as Educations_D,
} from '@Data/resume';

import Education from '@Components/resume/Education';
import Experience from '@Components/resume/Experience';

import '@Components/resume/ResumeSection.scss';

const cardVariants = {
	initial: { x: 50, opacity: 0 },
	animate: { x: 0, opacity: 1 },
};

const ResumeSection = () => {
	const expref = useRef(null);
	const eduref = useRef(null);
	const isexpInView = useInView(expref, { once: false, amount: 0.1 });
	const iseduInView = useInView(eduref, { once: false, amount: 0.1 });

	return (
		<section id="resume" className="resume">
			<h3 className="title">Resume</h3>

			<div ref={expref} className="experience">
				<h4 className="title">Professional Experience</h4>
				{Experiences_D.map(
					(Experience_D: EXPERIENCE_T, index: number) => (
						<motion.div
							variants={cardVariants}
							initial="initial"
							animate={isexpInView ? 'animate' : 'initial'}
							transition={{ duration: 0.5 }}
							className="item"
							key={`experience_${index}`}
						>
							<Experience Experience={Experience_D} />
						</motion.div>
					)
				)}
			</div>

			<div className="education">
				<h3 ref={eduref} className="title">
					Education
				</h3>
				{Educations_D.map((Education_D: EDUCATION_T, index: number) => (
					<motion.div
						variants={cardVariants}
						initial="false"
						animate={iseduInView ? 'animate' : 'initial'}
						transition={{ duration: 0.5 }}
						className="item"
						key={`education_${index}`}
					>
						<Education Education={Education_D} />
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default ResumeSection;
