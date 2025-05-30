import { HeroDataProps } from "../hero.type";
import { motion } from "framer-motion";
import { containerVariants, iconVariants } from "../hero.variants";
import { socialIcons } from "@/constants";

export function SocialIcons({
  icons,
  theme,
}: {
  icons: HeroDataProps["metadata"]["icons"];
  theme: string;
}) {
  return (
    <motion.div
      className={`grid grid-cols-3 gap-6 justify-items-center md:justify-items-start md:flex md:justify-start mt-10
      transition-colors duration-700 ease-in-out
      ${theme === "dark" ? "text-blue-300" : "text-blue-400"}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {icons.map((item, i) => {
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
              className={theme === "dark" ? "text-blue-300" : "text-blue-400"}
            />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
