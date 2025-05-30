import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Calendar, ArrowDownCircle, Briefcase } from "lucide-react";
import { cardVariants, descriptionVariants } from "../journey.variants";
import { ExperienceProps } from "../journey.type";
export function JourneyCard({
  experience,
  index,
  currentTheme,
}: {
  experience: ExperienceProps;
  index: number;
  currentTheme: string | undefined;
}) {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 160;
  const isLong = experience.description.length > MAX_LENGTH;

  const visibleText = expanded
    ? experience.description
    : experience.description.slice(0, MAX_LENGTH) + (isLong ? "..." : "");

  return (
    <motion.article
      aria-label={`Experiência: ${experience.title}`}
      tabIndex={0}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileFocus="focus"
      transition={{ delay: 0.15 * index }}
      className={`relative rounded-3xl p-8 border
        cursor-pointer
        shadow-sm
        focus-within:ring-2
        transition-colors duration-700 ease-in-out
        ${
          currentTheme === "dark"
            ? "bg-gray-800 border-gray-700 focus-within:ring-blue-400 text-slate-300"
            : "bg-white border-slate-100 focus-within:ring-blue-600 text-slate-800"
        }`}
    >
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-5">
          <div
            className={`p-3 rounded-full
              transition-colors duration-700 ease-in-out
              ${currentTheme === "dark" ? "bg-blue-900" : "bg-blue-100"}`}
          >
            <Briefcase size={24} className="text-blue-400" />
          </div>
          <div>
            <h3
              className={`font-bold text-xl leading-snug
                transition-colors duration-700 ease-in-out
                ${currentTheme === "dark" ? "text-blue-400" : "text-blue-600"}`}
            >
              {experience.title}
            </h3>
            <p
              className={`text-base mt-1
                transition-colors duration-700 ease-in-out
                ${
                  currentTheme === "dark" ? "text-slate-400" : "text-slate-700"
                }`}
            >
              {experience.company}
            </p>
          </div>
        </div>

        {experience.current && (
          <div
            className={`mt-2 sm:mt-0 sm:absolute sm:top-5 sm:right-5 px-4 py-1.5 rounded-full shadow-md font-semibold text-xs
              transition-colors duration-700 ease-in-out
              ${
                currentTheme === "dark"
                  ? "bg-blue-900 text-blue-400"
                  : "bg-blue-100 text-blue-700"
              }`}
            aria-label="Trabalho atual"
          >
            Atual
          </div>
        )}
      </header>

      <div
        className={`flex items-center gap-3 text-base mb-6
          transition-colors duration-700 ease-in-out
          ${currentTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}
      >
        <Calendar size={18} aria-hidden="true" />
        <time>{experience.period}</time>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={expanded ? "expanded" : "collapsed"}
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`text-base mb-4 leading-relaxed overflow-hidden
            transition-colors duration-700 ease-in-out
            ${currentTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}
        >
          {visibleText}
        </motion.p>
      </AnimatePresence>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={`description-${index}`}
          className={`text-base flex items-center gap-1 font-semibold select-none
            transition-colors duration-700 ease-in-out
            ${
              currentTheme === "dark"
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-500 hover:text-blue-600"
            }`}
        >
          {expanded ? "Ver menos" : "Ver mais"}
          <motion.span
            animate={{
              rotate: expanded ? 180 : 0,
              scale: expanded ? 1.15 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.5,
            }}
            aria-hidden="true"
          >
            <ArrowDownCircle size={20} />
          </motion.span>
        </button>
      )}
    </motion.article>
  );
}
