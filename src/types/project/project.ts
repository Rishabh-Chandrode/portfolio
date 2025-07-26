import type { StaticImageData } from 'next/image';

export type PROJECT_T = {
    title: string,
    description: string ,
    imageUrl: StaticImageData,
    giturl: string,
    liveurl: string,
    tag: string[]
}