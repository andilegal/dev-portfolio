"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "next-themes";
import { HeroDataProps } from "./hero.type";
import { createSequence } from "@/constants";
import { containerVariants, textVariants } from "./hero.variants";
import { SocialIcons } from "./social-icons";
import { ProfileImage } from "./profile-image";
import { useEffect, useState } from "react";

export function Hero({ data }: { data: HeroDataProps }) {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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

          <SocialIcons
            icons={data.metadata.icons}
            theme={currentTheme as string}
          />
        </motion.div>

        <ProfileImage
          imageUrl={data.metadata.image_url.url}
          theme={currentTheme as string}
        />
      </div>
    </section>
  );
}
