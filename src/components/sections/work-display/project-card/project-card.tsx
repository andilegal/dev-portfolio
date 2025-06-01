import { Project } from "@/app/projects/projects.type";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProjectCard({
  project,
  isDark,
  isExpanded,
  toggleExpand,
  index,
}: {
  project: Project;
  isDark: boolean;
  isExpanded: boolean;
  toggleExpand: () => void;
  index: number;
}) {
  const shouldExpand = project.description.length > 200;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      whileHover={{
        scale: 1.02,
        boxShadow: isDark
          ? "0 10px 30px rgba(96, 165, 250, 0.15)"
          : "0 10px 30px rgba(59, 130, 246, 0.15)",
      }}
      className={`${
        isDark
          ? "bg-slate-800 border border-slate-700"
          : "bg-white border border-slate-200"
      } rounded-2xl overflow-hidden shadow-lg transition-all duration-300`}
    >
      <Link
        href={project.demourl ?? ""}
        target="_blank"
        title={`Link para ${project.title}`}
        rel="noopener noreferrer"
        className={`relative h-48 flex items-center justify-center ${
          isDark ? "bg-slate-700 text-blue-300" : "bg-blue-100 text-blue-500"
        }`}
      >
        <Image
          src={project.image?.url || ""}
          alt={project.title}
          fill
          className="object-cover"
        />
      </Link>

      <div className="p-5">
        <h3
          className={`text-xl font-bold mb-3 ${
            isDark ? "text-blue-400" : "text-blue-600"
          }`}
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
              className={`text-sm leading-relaxed mb-2 ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {isExpanded || !shouldExpand
                ? project.description
                : `${project.description.slice(0, 200)}...`}
            </p>
          </motion.div>
        </AnimatePresence>

        {shouldExpand && (
          <button
            onClick={toggleExpand}
            className={`flex items-center gap-1 text-xs font-medium hover:underline ${
              isDark ? "text-blue-400" : "text-blue-500"
            }`}
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
          {project.technologies.split(",").map((tech: string) => (
            <span
              key={tech}
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                isDark
                  ? "bg-blue-900 text-blue-200"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.demourl && (
            <Link
              href={project.demourl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-semibold shadow hover:bg-blue-700 transition"
            >
              <ExternalLink className="w-4 h-4" /> Demo
            </Link>
          )}
          {project.githuburl && (
            <Link
              href={project.githuburl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-4 py-2 bg-gray-800 text-white rounded-full text-xs font-semibold shadow hover:bg-gray-900 transition"
            >
              <Github className="w-4 h-4" /> GitHub
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
