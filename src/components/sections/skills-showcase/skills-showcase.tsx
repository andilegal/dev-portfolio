"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { skills } from "@/constants";
import { SkillCard } from "./skills-card";
import {
  darkThemeColors,
  lightThemeColors,
  titleAnimation,
} from "./animations";

export function SkillsShowcase() {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const colors = currentTheme === "dark" ? darkThemeColors : lightThemeColors;

  return (
    <div
      className="h-full md:h-screen px-6"
      style={
        {
          background: colors.background,
          "--nextjs-icon-color": colors.nextJsIconColor,
        } as React.CSSProperties
      }
    >
      <section
        className={`flex flex-col items-center pt-28 transition-colors duration-500 text-slate-900 dark:text-slate-100`}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
        aria-label="Seção de habilidades técnicas"
      >
        <motion.h2
          className={`text-4xl md:text-5xl font-extrabold text-center mb-20 tracking-wide select-none ${colors.textColor}`}
          animate={titleAnimation}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          ⚙️ My Skills
        </motion.h2>

        <motion.ul
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
            <SkillCard
              key={name}
              name={name}
              icon={icon}
              cardBg={colors.cardBg}
              cardBorder={colors.cardBorder}
              cardShadow={colors.cardShadow}
              textColor={colors.textColor}
            />
          ))}
        </motion.ul>
      </section>
    </div>
  );
}
