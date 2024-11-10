
import { AnimatePresence, motion } from "framer-motion";
export default function MotionDiv({ children, ...props }) {


    return (
        <AnimatePresence
            
            {...props}
             >

            {children}

        </AnimatePresence>
    )


}