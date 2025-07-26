'use client';
import {motion} from 'framer-motion';
import Image from 'next/image';

import { SKILL_T } from '@Types/skills/skills';

const skillVariants = {
	hidden: { x: 50, opacity: 0 },
	show: { x: 0, opacity: 1 }
  };

const Skill = ({ skill }: { skill: SKILL_T}) => {
	return (
		<motion.div
			variants={skillVariants}
			initial="hidden"
			animate="show"
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
            <p>{skill.name}</p>
		</motion.div>
	);
};

export default Skill;
