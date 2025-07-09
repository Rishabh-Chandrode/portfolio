'use client';

import dynamic from 'next/dynamic';

const TypeAnimation = dynamic(() => import('react-type-animation').then(mod => mod.TypeAnimation), {
    ssr: false,
    loading: () => <span>Software Engineer</span>,
});

export default function Type_Animation () {
    return (
    <TypeAnimation
        sequence={[
        'Software Engineer',
        1000, 
        'Coder',
        1000,
        'Motoring Aficionado',
        1000,
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
    />);
}

