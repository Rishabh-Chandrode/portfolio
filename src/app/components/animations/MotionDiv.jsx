
import { AnimatePresence, motion } from "framer-motion";
export default function MotionDiv({ children, ...props }) {


    return (
        <motion.div
            
            {...props}
             >

            {children}

        </motion.div>
    )


}