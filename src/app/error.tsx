"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

interface ErrorProps {
  error: Error;
  reset: () => void;
  locale?: "en" | "pt";
}

export const metadata = {
  title: "Deu alguma coisa errada na página | Anderson.dev",
  description:
    "Ocorreu um erro inesperado nesta página. Por favor, tente atualizar ou volte mais tarde. Se o problema continuar, entre em contato com o suporte.",
};

export default function Error({ error, reset, locale = "pt" }: ErrorProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.error(error);
    setMounted(true);

    document.title = "Deu alguma coisa errada na página";

    return () => {
      document.title = "Início | Anderson";
    };
  }, [error]);

  const isDark = mounted && resolvedTheme === "dark";

  const texts = {
    en: {
      title: "Something went wrong",
      message: "An unexpected error occurred. Please try again.",
      button: "Try again",
    },
    pt: {
      title: "Algo deu errado",
      message: "Ocorreu um erro inesperado. Tente novamente.",
      button: "Tentar novamente",
    },
  };

  const { title, message, button } = texts[locale];

  // Variants para animação do título letra a letra
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 30 },
    },
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex flex-col items-center justify-center px-4 text-center transition-colors duration-500 ${
        isDark ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      <motion.h1
        className="text-5xl font-bold mb-4 flex justify-center flex-wrap gap-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label={title}
      >
        {title.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            className={char === " " ? "w-2" : ""}
            aria-hidden="true"
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <p className="text-lg mb-6 text-muted-foreground">{message}</p>

      <motion.button
        onClick={reset}
        initial={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, opacity: 0.9 }}
        whileFocus={{ scale: 1.05, opacity: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.3,
        }}
        className={`px-6 py-2 cursor-pointer rounded-full font-semibold shadow focus:outline-none focus:ring-4 focus:ring-red-400 transition-colors duration-300 ${
          isDark
            ? "bg-cyan-400 text-white hover:bg-cyan-300"
            : "bg-blue-600 text-white hover:bg-blue-500"
        }`}
      >
        {button}
      </motion.button>
    </motion.main>
  );
}
