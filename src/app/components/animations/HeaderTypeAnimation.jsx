'use client';
import { TypeAnimation } from 'react-type-animation';
export default function Type_Animation () {
    return (
    <TypeAnimation
        sequence={[
        'Software Engineer',
        1000, 
        'Coder',
        1000,
        'FullStack developer',
        1000,
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
    />);
}