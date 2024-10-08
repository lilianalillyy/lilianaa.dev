import { c } from "../../../utils";
import { transition, whileTap } from "./motion";
import { motion } from "framer-motion";

export const ThemeToggleSun = () => {
  const raysVariants = {
    initial: { rotate: 45 },
    animate: { rotate: 0, transition },
  };

  const coreVariants = {
    initial: { scale: 1.5 },
    animate: { scale: 1, transition },
  };


  return (
    <motion.svg
      key="sun"
      className={c("w-8 h-8 text-gray-200 hover:text-white focus:text-white transition duration-300 ease-in-out")}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileTap={whileTap}
      style={{ originX: "50%", originY: "50%" }}
    >
      <motion.circle
        cx="11.9998"
        cy="11.9998"
        r="5.75375"
        fill="currentColor"
        initial="initial"
        animate="animate"
        variants={coreVariants}
      />
      <motion.g initial="initial" animate="animate" variants={raysVariants}>
        <circle
          cx="3.08982"
          cy="6.85502"
          r="1.71143"
          transform="rotate(-60 3.08982 6.85502)"
          fill="currentColor"
        />
        <circle
          cx="3.0903"
          cy="17.1436"
          r="1.71143"
          transform="rotate(-120 3.0903 17.1436)"
          fill="currentColor"
        />
        <circle cx="12" cy="22.2881" r="1.71143" fill="currentColor" />
        <circle
          cx="20.9101"
          cy="17.1436"
          r="1.71143"
          transform="rotate(-60 20.9101 17.1436)"
          fill="currentColor"
        />
        <circle
          cx="20.9101"
          cy="6.8555"
          r="1.71143"
          transform="rotate(-120 20.9101 6.8555)"
          fill="currentColor"
        />
        <circle cx="12" cy="1.71143" r="1.71143" fill="currentColor" />
      </motion.g>
    </motion.svg>
  );
};