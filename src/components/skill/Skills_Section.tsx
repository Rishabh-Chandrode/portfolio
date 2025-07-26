'use client';
import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { skills } from '@Data/skills';

import Skill from '@Components/skill/Skill';
import {  SKILL_T, SKILL_CATEGORY_T } from '@Types/skills/skills';
import Skill_Categories from '@Components/skill/Skill_Categories';

import '@Components/skill/Skills.scss';

const Skills = () => {
	const [currentCategory, setCurrentCategory] = useState<SKILL_CATEGORY_T>('all');
	const filtered_skills = skills.filter((skill) => {
		return skill.tag.includes(currentCategory);
	});

	function handleSkillChange(skill_category: SKILL_CATEGORY_T): void {
		setCurrentCategory(skill_category);
	}

	return (
		<section id="skills_section">
			<h3 className="title">Skills</h3>
			<Skill_Categories current_category={currentCategory} changeHandler={handleSkillChange} />
			<div className="skills">
				<AnimatePresence>
					{filtered_skills.map((skill: SKILL_T) => (
						<Skill
							key={`${currentCategory}_${skill.name}`}
							skill={skill}
						/>
					))}
				</AnimatePresence>
			</div>
		</section>
	);
};

export default Skills;
