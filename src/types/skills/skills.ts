import { StaticImageData } from 'next/image';

export type SkillCategory = 'programming' | 'web' | 'db' | 'os' | 'misc';

export type Skill = {
    name: string;
    icon: StaticImageData;
};