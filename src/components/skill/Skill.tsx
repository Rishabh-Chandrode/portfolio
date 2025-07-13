'use client';
import Image from 'next/image';
import { Skill as Skill_T } from '@Types/skills/skills';

import {motion} from 'framer-motion';

import '@Components/skill/Skills.scss';

const Skill = ({ skill, index }: { skill: Skill_T, index: number }) => {
	return (
		<motion.div
			initial={{ x: 50, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.5, delay: index * 0.05 }}
			className="skill"
		>
            <div className="skill-icon">
                <Image
                    src={skill.icon}
                    className="icon-image"
                    alt={`${skill.name} logo`}
					height={32}
					width={32}
                />
            </div>
            <h3>{skill.name}</h3>
		</motion.div>
	);
};

export default Skill;
