// Types
import { Skill, SkillCategory } from '@Types/skills/skills';

// SVGs
import cpp_icon from '@Svgs/cpp.svg';
import c_icon from '@Svgs/c.svg';
import python_icon from '@Svgs/python.svg';
import html_icon from '@Svgs/html.svg';
import css_icon from '@Svgs/css.svg';
import javascript_icon from '@Svgs/javascript.svg';
import react_icon from '@Svgs/react.svg';
import node_icon from '@Svgs/nodejs.svg';
import express_icon from '@Svgs/express.svg';
import mongodb_icon from '@Svgs/mongodb.svg';
import mysql_icon from '@Svgs/mysql.svg';
import linux_icon from '@Svgs/linux.svg';
import windows_icon from '@Svgs/windows.svg';
import git_icon from '@Svgs/git.svg';
import firebase_icon from '@Svgs/firebase.svg';
import dsa_icon from '@Svgs/data-structure.svg';
import algorithm_icon from '@Svgs/algorithm.svg';

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
      name: 'Firebase',
      icon: firebase_icon
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
