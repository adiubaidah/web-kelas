import { AnimatePresence,  motion, Transition } from "framer-motion";
function AnimationWrapper({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: .5 },
  keyValue,
  className,
}: {
    children: React.ReactNode,
    keyValue: React.Key,
    animate?: object,
    initial?: object,
    transition?: Transition,
    className?: string

}) {
  return (
    <AnimatePresence>
      <motion.section
        key={keyValue}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
}

export default AnimationWrapper;