
'use client';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

import { skill_categories } from '@Data/skills';

import { SKILL_CATEGORY_T } from '@Types/skills/skills';

const Skill_Categories = ({current_category, changeHandler}: {current_category: SKILL_CATEGORY_T, changeHandler: (skill_category: SKILL_CATEGORY_T) => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
	const [underlineProps, setUnderlineProps] = useState({
		left: 0,
		top: 0,
		width: 0,
		height: 3,
	});

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const active = container.querySelector(
			'.category.selected'
		) as HTMLElement | null;
		if (active) {
			const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = active;
			setUnderlineProps({
				left: offsetLeft,
				top: offsetTop + offsetHeight - 3,
				width: offsetWidth,
				height: 3,
			});
		}
	}, [current_category]);
    return (
        <div className="categories" ref={containerRef}>
				{skill_categories.map((skill_category: SKILL_CATEGORY_T) => (
					<div
						key={skill_category}
						onClick={() => changeHandler(skill_category)}
						className={`category cursor-pointer ${
							current_category === skill_category ? 'selected' : ''
						}`}
					>
						{skill_category.toUpperCase()}
					</div>
				))}

				<motion.div
					className="category-underline"
					layout
					transition={{ type: 'spring', stiffness: 300, damping: 20 }}
					animate={{
						left: underlineProps.left,
						top: underlineProps.top,
						width: underlineProps.width,
						height: underlineProps.height,
					}}
				/>
			</div>
    );
};

export default Skill_Categories;