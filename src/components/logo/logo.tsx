import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logotipo.png";
import Img from "../img/img";

export type LogoProps = {
  text?: string;
  showText?: boolean;
  className?: string;
};

export const Logo = ({
  text = "facter truck",
  showText = false,
  className = "",
}: LogoProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Img source={logo} alt="Logo" width={32} height={32} />
      <AnimatePresence initial={false}>
        {showText && (
          <motion.span
            key="logo-text"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="text-2xl font-semibold text-white overflow-hidden whitespace-nowrap"
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
