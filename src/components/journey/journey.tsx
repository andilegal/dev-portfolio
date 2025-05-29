"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ExperienceDataProps } from "./journey.type";

import { JourneyCard } from "./journey-card";

export function Journey({ data }: { data: ExperienceDataProps }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;

  return (
    <section
      className={`${
        currentTheme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-slate-300"
          : "bg-gradient-to-br from-white via-blue-50 to-white text-slate-800"
      }`}
    >
      <div
        className={`px-6 py-24 max-w-[1200px] mx-auto my-0
        transition-colors duration-700 ease-in-out
       `}
        aria-label={`Seção ${data.metadata.heading} - Experiências Profissionais`}
      >
        <motion.h2
          initial={{ opacity: 0, y: -25, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          className={`text-4xl md:text-5xl font-extrabold text-center mb-16
          transition-colors duration-700 ease-in-out
          ${currentTheme === "dark" ? "text-blue-400" : "text-blue-600"}`}
        >
          {data.metadata.heading}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {data.metadata.experiences.map((exp, i) => (
            <JourneyCard
              key={i}
              experience={exp}
              index={i}
              currentTheme={currentTheme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
