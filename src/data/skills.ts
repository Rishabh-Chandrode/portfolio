// Types
import { Skill, SkillCategory } from '@Types/skills/skills';

import cpp_icon from '@Images/logos/skills/cpp.png';
import c_icon from '@Images/logos/skills/c.png';
import python_icon from '@Images/logos/skills/python.png';
import html_icon from '@Images/logos/skills/html.png';
import css_icon from '@Images/logos/skills/css.png';
import javascript_icon from '@Images/logos/skills/javascript.png';
import react_icon from '@Images/logos/skills/react.png';
import node_icon from '@Images/logos/skills/node.png';
import express_icon from '@Images/logos/skills/express.png';
import mongodb_icon from '@Images/logos/skills/mongodb.png';
import mysql_icon from '@Images/logos/skills/sql.png';
import linux_icon from '@Images/logos/skills/linux.png';
import windows_icon from '@Images/logos/skills/windows.png';
import git_icon from '@Images/logos/skills/git.png';
import dsa_icon from '@Images/logos/skills/data-structure.png';
import algorithm_icon from '@Images/logos/skills/algorithm.png';

const skill_categories: SkillCategory[] = ['all', 'programming', 'web', 'db', 'os', 'misc']

const skills: Skill[] = [
  {
    name: 'C++',
    icon: cpp_icon,
    tag: ['all', 'programming'],
  },
  {
    name: 'C',
    icon: c_icon,
    tag: ['all', 'programming'],
  },
  {
    name: 'Python',
    icon: python_icon,
    tag: ['all', 'programming'],
  },
  {
    name: 'HTML',
    icon: html_icon,
    tag: ['all', 'web'],
  },
  {
    name: 'CSS',
    icon: css_icon,
    tag: ['all', 'web'],
  },
  {
    name: 'JavaScript',
    icon: javascript_icon,
    tag: ['all', 'web'],
  },
  {
    name: 'React',
    icon: react_icon,
    tag: ['all', 'web'],
  },
  {
    name: 'Node.js',
    icon: node_icon,
    tag: ['all', 'web'],
  },
  {
    name: 'Express.js',
    icon: express_icon,
    tag: ['all', 'web'],
  },
  {
    name: 'MongoDB',
    icon: mongodb_icon,
    tag: ['all', 'db'],
  },
  {
    name: 'MySQL',
    icon: mysql_icon,
    tag: ['all', 'db'],
  },
  {
    name: 'Linux',
    icon: linux_icon,
    tag: ['all', 'os'],
  },
  {
    name: 'Windows',
    icon: windows_icon,
    tag: ['all', 'os'],
  },
  {
    name: 'Git',
    icon: git_icon,
    tag: ['all', 'misc'],
  },
  {
    name: 'Data Structure',
    icon: dsa_icon,
    tag: ['all', 'misc'],
  },
  {
    name: 'Algorithm',
    icon: algorithm_icon,
    tag: ['all', 'misc'],
  },
];

export {skills, skill_categories};