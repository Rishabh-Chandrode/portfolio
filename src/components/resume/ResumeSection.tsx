'use client';
import './ResumeSection.scss';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

import { Education as Education_T } from '@Types/resume/education';
import { Experience as Experience_T } from '@Types/resume/experience';

import {
	Experiences as Experiences_D,
	Educations as Educations_D,
} from '@Data/resume';

import Education from '@Components/resume/Education';
import Experience from '@Components/resume/Experience';
import MotionDiv from '../Wrapper/Animations/MotionDiv';

const cardVariants = {
	initial: { x: 50, opacity: 0 },
	animate: { x: 0, opacity: 1 },
};

const ResumeSection = () => {
	const expref = useRef(null);
	const eduref = useRef(null);
	const isexpInView = useInView(expref, { once: false, amount: 0.5 });
	const iseduInView = useInView(eduref, { once: false, amount: 0.5 });

	return (
		<section id="resume" className="resume pt-10  ">
			<div className="container">
				<div className="section-title"></div>

				<div className="">
					<div ref={expref} className="">
						<h3 className="resume-title">
							Professional Experience
						</h3>
						{Experiences_D.map((Experience_D: Experience_T , index: number) => (
							<MotionDiv
								variants={cardVariants}
								initial='false'
								animate={isexpInView ? 'animate' : 'initial'}
								transition={{ duration: 0.5 }}
								className="resume-item"
                key={`experience_${index}`}
							>
								<Experience Experience={Experience_D} key={`experience_${index}`} />
							</MotionDiv>
						))}
					</div>

					<div className="">
						<h3 ref={eduref} className="resume-title">
							Education
						</h3>
						{Educations_D.map((Education_D: Education_T, index: number) => (
							<MotionDiv
								variants={cardVariants}
								initial='false'
								animate={iseduInView ? 'animate' : 'initial'}
								transition={{ duration: 0.5 }}
								className="resume-item"
                key={`education_${index}`}
							>
								<Education Education={Education_D}  key={`education_${index}`} />
							</MotionDiv>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ResumeSection;
