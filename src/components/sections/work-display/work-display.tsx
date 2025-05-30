"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { ProjectPageProps } from "@/app/projects/projects.type";
import { ProjectFilter } from "./project-filter";
import { ProjectCard } from "./project-card";

export function WorkDisplay({ data }: { data: ProjectPageProps }) {
  const heading = data.metadata.heading;
  const projectsData = data.metadata.projects;

  const [filter, setFilter] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [animatedText, setAnimatedText] = useState("");
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  const allTechnologies = Array.from(
    new Set(projectsData.flatMap((p) => p.technologies.split(",")))
  ).sort();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleExpand = (id: number) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const filteredProjects = filter
    ? projectsData.filter((p) =>
        p.technologies
          .split(",")
          .some((tech) => tech.toLowerCase() === filter.toLowerCase())
      )
    : projectsData;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setAnimatedText(heading.slice(0, i + 1));
      i++;
      if (i === heading.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [heading]);

  return (
    <div
      className={
        isDark
          ? "min-h-screen py-26 bg-slate-900 text-slate-100 transition-colors duration-300"
          : "min-h-screen py-26 bg-white text-slate-900 transition-colors duration-300"
      }
    >
      <section className="max-w-[1200px] mx-auto my-0 px-6">
        <h2
          className={
            isDark
              ? "text-4xl font-bold text-center text-blue-400 mb-12 select-none h-12"
              : "text-4xl font-bold text-center text-blue-600 mb-12 select-none h-12"
          }
        >
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {animatedText}
            <motion.span
              className={
                isDark
                  ? "inline-block ml-1 w-1 h-6 bg-blue-400 animate-pulse"
                  : "inline-block ml-1 w-1 h-6 bg-blue-600 animate-pulse"
              }
              key={animatedText.length}
            />
          </motion.span>
        </h2>

        <ProjectFilter
          allTechnologies={allTechnologies}
          currentFilter={filter}
          setFilter={setFilter}
          isDark={isDark}
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length === 0 && (
            <p className="text-center text-slate-500 col-span-full">
              Nenhum projeto encontrado para <strong>{filter}</strong>.
            </p>
          )}

          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              isDark={isDark}
              isExpanded={!!expanded[i]}
              toggleExpand={() => toggleExpand(i)}
              index={i}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
