import { StaticImageData } from 'next/image';

export type SKILL_CATEGORY_T = 'all' | 'programming' | 'web' | 'db' | 'os' | 'misc' | 'none';

export type SKILL_T = {
    name: string;
    icon: StaticImageData;
    tag: SKILL_CATEGORY_T[];
};