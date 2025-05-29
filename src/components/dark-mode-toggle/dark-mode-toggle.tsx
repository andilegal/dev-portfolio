"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // não renderiza nada no SSR, só no cliente

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const sliderVariants = {
    light: { x: 0, boxShadow: "0 0 8px rgba(0,0,0,0.2)" },
    dark: { x: 28, boxShadow: "0 0 12px rgba(255,255,255,0.9)" },
  };

  const iconVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hidden: { opacity: 0, scale: 0.6, transition: { duration: 0.2 } },
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar modo claro e escuro"
      role="switch"
      aria-checked={currentTheme === "dark"}
      className="relative w-16 h-9 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center px-1 cursor-pointer
        bg-gray-300 dark:bg-gray-700 transition-colors duration-500"
    >
      <motion.span
        className="block w-7 h-7 bg-white rounded-full shadow-md absolute left-1 top-1 cursor-pointer"
        variants={sliderVariants}
        animate={currentTheme === "dark" ? "dark" : "light"}
        whileHover={{ scale: 1.15, boxShadow: "0 0 15px rgba(0,0,0,0.3)" }}
        whileTap={{ scale: 0.9 }}
      />

      <motion.span
        className="absolute left-3 text-yellow-500 text-lg select-none pointer-events-none"
        variants={iconVariants}
        initial="visible"
        animate={currentTheme === "dark" ? "hidden" : "visible"}
        aria-hidden="true"
      >
        ☀️
      </motion.span>

      <motion.span
        className="absolute right-3 text-gray-900 dark:text-yellow-300 text-lg select-none pointer-events-none"
        variants={iconVariants}
        initial="hidden"
        animate={currentTheme === "dark" ? "visible" : "hidden"}
        aria-hidden="true"
      >
        🌙
      </motion.span>
    </button>
  );
}
