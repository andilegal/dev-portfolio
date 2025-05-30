"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import { ProjectPageProps } from "@/app/projects/projects.type";
import Image from "next/image";

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

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter(null)}
            className={
              !filter
                ? "cursor-pointer rounded-full px-5 py-2 border-2 text-sm font-semibold shadow-sm transition-all select-none bg-blue-600 text-white border-blue-600"
                : isDark
                ? "cursor-pointer rounded-full px-5 py-2 border-2 text-sm font-semibold shadow-sm transition-all select-none bg-slate-800 text-blue-400 border-blue-300 hover:bg-slate-700"
                : "cursor-pointer rounded-full px-5 py-2 border-2 text-sm font-semibold shadow-sm transition-all select-none bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
            }
          >
            Todos
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={
                filter === tech
                  ? "cursor-pointer rounded-full px-5 py-2 border-2 text-sm font-semibold shadow-sm transition-all select-none bg-blue-600 text-white border-blue-600"
                  : isDark
                  ? "cursor-pointer rounded-full px-5 py-2 border-2 text-sm font-semibold shadow-sm transition-all select-none bg-slate-800 text-blue-400 border-blue-300 hover:bg-slate-700"
                  : "cursor-pointer rounded-full px-5 py-2 border-2 text-sm font-semibold shadow-sm transition-all select-none bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
              }
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Grid de projetos */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length === 0 && (
            <p className="text-center text-slate-500 col-span-full">
              Nenhum projeto encontrado para <strong>{filter}</strong>.
            </p>
          )}

          {filteredProjects.map((project, i) => {
            const isExpanded = expanded[i];
            const shouldExpand = project.description.length > 200;

            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: isDark
                    ? "0 10px 30px rgba(96, 165, 250, 0.15)"
                    : "0 10px 30px rgba(59, 130, 246, 0.15)",
                }}
                className={
                  isDark
                    ? "bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
                    : "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
                }
              >
                <div
                  className={
                    isDark
                      ? "relative h-48 bg-slate-700 flex items-center justify-center text-blue-300"
                      : "relative h-48 bg-blue-100 flex items-center justify-center text-blue-500"
                  }
                >
                  <Image
                    src={project.image?.url || ""}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3
                    className={
                      isDark
                        ? "text-xl font-bold text-blue-400 mb-3"
                        : "text-xl font-bold text-blue-600 mb-3"
                    }
                  >
                    {project.title}
                  </h3>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isExpanded ? "expanded" : "collapsed"}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p
                        className={
                          isDark
                            ? "text-sm leading-relaxed mb-2 text-slate-300"
                            : "text-sm leading-relaxed mb-2 text-slate-700"
                        }
                      >
                        {isExpanded || !shouldExpand
                          ? project.description
                          : `${project.description.slice(0, 200)}...`}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {shouldExpand && (
                    <button
                      onClick={() => toggleExpand(i)}
                      className={
                        isDark
                          ? "flex items-center gap-1 text-blue-400 hover:underline text-xs font-medium"
                          : "flex items-center gap-1 text-blue-500 hover:underline text-xs font-medium"
                      }
                    >
                      {isExpanded ? (
                        <>
                          Ver menos <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Ver mais <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}

                  <div className="flex flex-wrap gap-2 mt-4 mb-5">
                    {project.technologies.split(",").map((tech) => (
                      <span
                        key={tech}
                        className={
                          isDark
                            ? "text-xs bg-blue-900 text-blue-200 px-3 py-1 rounded-full font-medium"
                            : "text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium"
                        }
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.demourl && (
                      <a
                        href={project.demourl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-semibold shadow hover:bg-blue-700 transition"
                      >
                        <ExternalLink className="w-4 h-4" /> Demo
                      </a>
                    )}
                    {project.githuburl && (
                      <a
                        href={project.githuburl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-4 py-2 bg-gray-800 text-white rounded-full text-xs font-semibold shadow hover:bg-gray-900 transition"
                      >
                        <Github className="w-4 h-4" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
