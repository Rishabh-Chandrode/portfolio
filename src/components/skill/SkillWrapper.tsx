


import Skill from '@/src/components/skill/Skill';
import { Skill as Skill_T, SkillCategory } from '@Types/skills/skills';


const SkillWrapper = ({skills, currentCategory} : {skills: Skill_T[], currentCategory:SkillCategory }) => {
    return (
        skills.map((skill, index) => (
            <Skill key={`${currentCategory}_${skill.name}`} skill={skill} index={index}/>
        ))
    );
};

export default SkillWrapper;