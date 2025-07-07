import type { StaticImageData } from 'next/image';
export type Project = {
    title: string,
    description: string ,
    imageUrl: StaticImageData,
    giturl: string,
    liveurl: string,
    tag: string[]
}