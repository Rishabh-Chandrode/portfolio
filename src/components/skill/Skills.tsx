'use client';
import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';

import { SkillCategory } from '@Types/skills/skills';
import skills from '@Data/skills';

import dynamic from 'next/dynamic';
import '@Components/skill/Skills.scss';

const SkillWrapper = dynamic(
	() => import('@/src/components/skill/SkillWrapper'),
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
		useState<SkillCategory>('all');
	const filtered_skills = skills.filter((skill) => {
		return skill.tag.includes(currentCategory);
	});

	function handleSkillChange(skill_category: SkillCategory) {
		setCurrentCategory('none');
		setCurrentCategory(skill_category);
	}

	return (
		<section id="skillsSection" className=" pt-11">
			<div className="section-title font-bold text-2xl my-5 ">Skills</div>
			<div className="category flex flex-wrap">
				<div
					onClick={() => handleSkillChange('all')}
					className={`${
						currentCategory === 'all'
							? 'bg-primary-500'
							: 'border-2 border-sky-500'
					} cursor-pointer inline rounded-md py-2 px-3 m-1 `}
				>
					All
				</div>
				<div
					onClick={() => handleSkillChange('programming')}
					className={`${
						currentCategory === 'programming'
							? 'bg-primary-500'
							: 'border-2 border-sky-500'
					} cursor-pointer inline rounded-md py-2 px-3 m-1 `}
				>
					Programming
				</div>
				<div
					onClick={() => handleSkillChange('web')}
					className={`${
						currentCategory === 'web'
							? 'bg-primary-500'
							: 'border-2 border-sky-500'
					} cursor-pointer inline rounded-md py-2 px-3 m-1 `}
				>
					Web
				</div>
				<div
					onClick={() => handleSkillChange('db')}
					className={`${
						currentCategory === 'db'
							? 'bg-primary-500'
							: 'border-2 border-sky-500'
					} cursor-pointer inline rounded-md py-2 px-3 m-1 `}
				>
					DB
				</div>
				<div
					onClick={() => handleSkillChange('os')}
					className={`${
						currentCategory === 'os'
							? 'bg-primary-500'
							: 'border-2 border-sky-500'
					} cursor-pointer inline rounded-md py-2 px-3 m-1 `}
				>
					OS
				</div>
				<div
					onClick={() => handleSkillChange('misc')}
					className={`${
						currentCategory === 'misc'
							? 'bg-primary-500'
							: 'border-2 border-sky-500'
					} cursor-pointer inline rounded-md py-2 px-3 m-1 `}
				>
					Miscellaneous
				</div>
			</div>

			<div className="skills flex flex-wrap">
				<AnimatePresence>
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
