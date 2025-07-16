"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import { SkillCategory } from "@Types/skills/skills";
import { skills, skill_categories } from "@Data/skills";

import dynamic from "next/dynamic";
import "@Components/skill/Skills.scss";

const SkillWrapper = dynamic(
	() => import("@/src/components/skill/SkillWrapper"),
	{
		ssr: false,
		loading: () => (
			<>
				{skills.map((skill, index) => (
					<div key={index} className="skill">
						<div className="skill-icon">
							<Image
								src={skill.icon}
								className="icon-image"
								alt={`${skill.name} logo`}
							/>
						</div>
						<h3>{skill.name}</h3>
					</div>
				))}
			</>
		),
	}
);

const Skills = () => {
	const [currentCategory, setCurrentCategory] =
		useState<SkillCategory>("all");
	const filtered_skills = skills.filter((skill) => {
		return skill.tag.includes(currentCategory);
	});

	function handleSkillChange(skill_category: SkillCategory) {
		setCurrentCategory(skill_category);
	}

	return (
		<section id="skillsSection" className=" pt-11">
			<div className="section-title font-bold text-2xl my-5 ">Skills</div>
			<div className="category flex flex-wrap">
				{skill_categories.map((skill_category: SkillCategory) => (
					<div
						key={skill_category}
						onClick={() => handleSkillChange(skill_category)}
						className={`${
							currentCategory === skill_category
								? "bg-primary-500"
								: ""
						} cursor-pointer border-2 border-sky-500 inline rounded-md py-2 px-3 m-1 `}
					>
						{skill_category.toUpperCase()}
					</div>
				))}
			</div>

			<div className="skills flex flex-wrap">
				<AnimatePresence mode="wait">
					<SkillWrapper
						skills={filtered_skills}
						currentCategory={currentCategory}
					/>
				</AnimatePresence>
			</div>
		</section>
	);
};

export default Skills;
