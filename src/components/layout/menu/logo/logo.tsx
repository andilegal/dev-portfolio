import Link from "next/link";
import { motion } from "framer-motion";

export function Logo({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      initial={{ scale: 1, textShadow: "0 0 0 rgba(0,0,0,0)" }}
      animate={{
        scale: [1, 1.05, 1],
        textShadow: isDark
          ? [
              "0 0 10px rgba(6,182,212,0.7)",
              "0 0 20px rgba(6,182,212,1)",
              "0 0 10px rgba(6,182,212,0.7)",
            ]
          : [
              "0 0 8px rgba(59,130,246,0.7)",
              "0 0 16px rgba(59,130,246,1)",
              "0 0 8px rgba(59,130,246,0.7)",
            ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <Link
        href="/"
        aria-label="Ir para a página inicial"
        className={`font-extrabold text-3xl select-none cursor-pointer ${
          isDark ? "text-cyan-400" : "text-blue-600"
        }`}
      >
        Anderson
      </Link>
    </motion.div>
  );
}
