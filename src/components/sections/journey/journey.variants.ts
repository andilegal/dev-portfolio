export const cardVariants = {
  hidden: { opacity: 0, x: -60, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 0.8,
    },
  },
  hover: {
    scale: 1.06,
    rotateZ: 2,
    boxShadow: "0 20px 50px rgba(59, 130, 246, 0.3)",
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  focus: {
    scale: 1.06,
    rotateZ: 2,
    boxShadow: "0 20px 50px rgba(59, 130, 246, 0.3)",
  },
};

export const descriptionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      opacity: { duration: 0.4, ease: "easeInOut" },
      height: { duration: 0.5, ease: "easeInOut" },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      opacity: { duration: 0.3, ease: "easeInOut" },
      height: { duration: 0.35, ease: "easeInOut" },
    },
  },
};
