"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { HeroDataProps } from "./hero.type";
import { createSequence, socialIcons } from "@/constants";
import {
  containerVariants,
  iconVariants,
  imageVariants,
  textVariants,
} from "./hero.variants";

export function Hero({ data }: { data: HeroDataProps }) {
  const [showPopover, setShowPopover] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;

  return (
    <section
      className={`bg-gradient-to-br ${
        currentTheme === "dark"
          ? "from-gray-900 via-gray-800 to-gray-900"
          : "from-white via-blue-50 to-white"
      }`}
    >
      <div
        className={`min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-24
         max-w-[1200px] mx-auto my-0
        transition-colors duration-700 ease-in-out 
       `}
      >
        <motion.div
          className="flex-1 max-w-lg text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className={`text-5xl font-extrabold mb-6 select-none leading-tight
          transition-colors duration-700 ease-in-out
          ${currentTheme === "dark" ? "text-blue-400" : "text-blue-400"}`}
            variants={textVariants}
          >
            {data.metadata.heading}
          </motion.h1>

          <motion.div
            className={`text-xl font-semibold mb-8 h-10
          transition-colors duration-700 ease-in-out
          ${currentTheme === "dark" ? "text-blue-300" : "text-blue-600"}`}
            variants={textVariants}
          >
            <TypeAnimation
              sequence={createSequence(data.metadata.animation_sequence_text)}
              wrapper="span"
              speed={40}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            className={`text-lg mb-10 max-w-md mx-auto md:mx-0 leading-relaxed
          transition-colors duration-700 ease-in-out
          ${currentTheme === "dark" ? "text-gray-300" : "text-slate-700"}`}
            variants={textVariants}
          >
            {data.metadata.subheading}
          </motion.p>

          {/* Redes Sociais */}
          <motion.div
            className={`grid grid-cols-3 gap-6 justify-items-center md:justify-items-start md:flex md:justify-start mt-10
          transition-colors duration-700 ease-in-out
          ${currentTheme === "dark" ? "text-blue-300" : "text-blue-400"}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {data.metadata.icons.map((item, i) => {
              const Icon = socialIcons[item.name as keyof typeof socialIcons];

              return (
                <motion.a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                  variants={iconVariants}
                  custom={i}
                  whileHover="hover"
                  aria-label={`Link para ${item.name || "rede social"}`}
                >
                  <Icon
                    size={28}
                    className={
                      currentTheme === "dark"
                        ? "text-blue-300"
                        : "text-blue-400"
                    }
                  />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 mt-16 md:mt-0 flex justify-center md:justify-end relative"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          onMouseEnter={() => setShowPopover(true)}
          onMouseLeave={() => setShowPopover(false)}
        >
          <motion.img
            src={data.metadata.image_url.url}
            loading="lazy"
            alt="Imagem de perfil"
            className={`md:w-96 md:h-96 w-64 h-64 rounded-full shadow-xl border-4 cursor-pointer hover:scale-105 transition-all duration-300
           ease-in-out
          ${
            currentTheme === "dark"
              ? "bg-gradient-to-tr from-gray-700 via-gray-600 to-gray-700 border-blue-500"
              : "bg-gradient-to-tr from-yellow-200 via-amber-200 to-yellow-100 border-blue-200"
          }`}
            whileHover={{ scale: 1.05, rotate: 1 }}
          />

          {/* Balão / Popover */}
          {showPopover && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white text-sm px-4 py-2 rounded-full shadow-lg"
            >
              👋 Entre em contato!
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
