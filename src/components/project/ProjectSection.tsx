"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { motion, useInView } from "framer-motion";

import projects from "@Data/projects";

import "@Components/project/Project_Section.scss";

const cardVariants = {
	initial: { y: 50, opacity: 0 },
	animate: { y: 0, opacity: 1 },
};

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
