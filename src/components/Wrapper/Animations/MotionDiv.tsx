import { motion, MotionProps } from "framer-motion";
import { ReactNode, HTMLAttributes } from "react";

type MotionDivProps = {
	children: ReactNode;
	useMotion?: boolean;
} & MotionProps &
	HTMLAttributes<HTMLDivElement>;

const MotionDiv = ({ children, useMotion = true, ...rest }: MotionDivProps) => {
	if (useMotion) {
		return <motion.div {...rest}>{children}</motion.div>;
	}
	return <div {...rest}>{children}</div>;
};

export default MotionDiv;
