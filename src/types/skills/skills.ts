import { StaticImageData } from 'next/image';

export type SkillCategory = 'all' | 'programming' | 'web' | 'db' | 'os' | 'misc' | 'none';

export type Skill = {
    name: string;
    icon: StaticImageData;
    tag: SkillCategory[];
};