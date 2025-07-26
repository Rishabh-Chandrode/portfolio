'use client';
import React, { useRef } from 'react';
import ProjectCard from './ProjectCard';
import { useInView } from 'framer-motion';

import projects from '@Data/projects';

import '@Components/project/Project_Section.scss';

const ProjectSection = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false });

	return (
		<section id="project_section">
			<h3 className="title">Projects</h3>
			<div ref={ref} className="projects">
				{projects.map((project, index) => (
					<ProjectCard key={index + project.title} project={project} index={index} isInView={isInView} />
				))}
			</div>
		</section>
	);
};

export default ProjectSection;
