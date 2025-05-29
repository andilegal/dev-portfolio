"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  SiEjs,
  SiAngular,
  SiFirebase,
  SiDocker,
  SiCypress,
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiGit,
} from "react-icons/si";

const skills = [
  { name: "Vue.js", icon: <SiEjs className="w-14 h-14 text-[#42b883]" /> },
  { name: "Angular", icon: <SiAngular className="w-14 h-14 text-[#dd0031]" /> },
  {
    name: "Firebase",
    icon: <SiFirebase className="w-14 h-14 text-[#FFCA28]" />,
  },
  { name: "Docker", icon: <SiDocker className="w-14 h-14 text-[#2496ED]" /> },
  { name: "Cypress", icon: <SiCypress className="w-14 h-14 text-[#17202c]" /> },
  {
    name: "TypeScript",
    icon: <SiTypescript className="w-14 h-14 text-[#007ACC]" />,
  },
  { name: "React", icon: <SiReact className="w-14 h-14 text-[#61DAFB]" /> },
  {
    name: "Next.js",
    icon: (
      <SiNextdotjs
        className="w-14 h-14"
        style={{ color: "var(--nextjs-icon-color)" }}
      />
    ),
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="w-14 h-14 text-[#339933]" />,
  },
  { name: "MongoDB", icon: <SiMongodb className="w-14 h-14 text-[#47A248]" /> },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss className="w-14 h-14 text-[#06B6D4]" />,
  },
  {
    name: "Git & GitHub",
    icon: <SiGit className="w-14 h-14 text-[#F05032]" />,
  },
];

export default function SkillsShowcase() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cardBg =
    theme === "dark" ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.85)";
  const cardBorder =
    theme === "dark" ? "rgba(59, 130, 246, 0.6)" : "rgba(59, 130, 246, 0.3)";
  const cardShadow =
    theme === "dark"
      ? "0 8px 24px rgba(59, 130, 246, 0.3)"
      : "0 8px 24px rgba(59, 130, 246, 0.15)";
  const textColor = theme === "dark" ? "text-blue-300" : "text-blue-900";

  // Define CSS variável para cor do ícone Next.js
  const nextJsIconColor = theme === "dark" ? "#fff" : "#000"; // branco no dark, preto no light

  return (
    <div
      className="h-full md:h-screen px-6"
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #0d1117 0%, #161b22 100%)"
            : "linear-gradient(135deg, #e6f0fa 0%, #dce8f9 100%)",
        "--nextjs-icon-color": nextJsIconColor,
      }}
    >
      <section
        className="flex flex-col items-center pt-28 transition-colors duration-500 text-slate-900 dark:text-slate-100"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        aria-label="Seção de habilidades técnicas"
      >
        <motion.h2
          className={`text-4xl md:text-5xl font-extrabold text-center mb-20 tracking-wide select-none ${
            theme === "dark" ? "text-blue-300" : "text-blue-700"
          }`}
          animate={{
            rotateY: [0, 10, -10, 10, 0],
            rotateX: [0, 5, -5, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ⚙️ Minhas Habilidades
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {skills.map(({ name, icon }) => (
            <motion.div
              key={name}
              className="rounded-2xl p-6 sm:p-8 border cursor-default flex flex-col items-center justify-center gap-4 text-center transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03]"
              style={{
                background: cardBg,
                borderColor: cardBorder,
                boxShadow: cardShadow,
              }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              tabIndex={0}
              role="group"
              aria-label={name}
            >
              <div>{icon}</div>
              <span
                className={`text-base sm:text-lg md:text-xl font-semibold ${textColor}`}
              >
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
