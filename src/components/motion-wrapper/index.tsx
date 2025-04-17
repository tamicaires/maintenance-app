import { motion } from "framer-motion";

export const MotionWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex-grow overflow-hidden"
  >
    {children}
  </motion.div>
);
