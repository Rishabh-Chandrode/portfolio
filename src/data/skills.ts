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

const skills: Record<SkillCategory, Skill[]> = {
  programming: [
    {
      name: 'C++',
      icon: cpp_icon
    },
    {
      name: 'C',
      icon: c_icon
    },
    {
      name: 'Python',
      icon: python_icon
    },
  ],
  web: [
    {
      name: 'HTML',
      icon: html_icon
    },
    {
      name: 'CSS',
      icon: css_icon
    },
    {
      name: 'JavaScript',
      icon: javascript_icon
    },
    {
      name: 'React',
      icon: react_icon
    },
    {
      name: 'Node.js',
      icon: node_icon
    },
    {
      name: 'Express.js',
      icon: express_icon
    },
  ],
  db: [
    {
      name: 'MongoDB',
      icon: mongodb_icon
    },
    {
      name: 'MySQL',
      icon: mysql_icon
    },
  ],
  os: [
    {
      name: 'Linux',
      icon: linux_icon
    },
    {
      name: 'Windows',
      icon: windows_icon
    },
  ],
  misc: [
    {
      name: 'Git',
      icon: git_icon
    },
    {
      name: 'Data Structure',
      icon: dsa_icon
    },
    {
      name: 'Algorithm',
      icon: algorithm_icon
    },
  ],
};

export default skills;