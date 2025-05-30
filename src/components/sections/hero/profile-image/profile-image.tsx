import { useState } from "react";
import { motion } from "framer-motion";
import { imageVariants } from "../hero.variants";

export function ProfileImage({
  imageUrl,
  theme,
}: {
  imageUrl: string;
  theme: string;
}) {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <motion.div
      className="flex-1 mt-16 md:mt-0 flex justify-center md:justify-end relative"
      variants={imageVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setShowPopover(true)}
      onMouseLeave={() => setShowPopover(false)}
    >
      <motion.img
        src={imageUrl}
        loading="lazy"
        alt="Imagem de perfil"
        className={`md:w-96 md:h-96 w-64 h-64 rounded-full shadow-xl border-4 cursor-pointer hover:scale-105 transition-all duration-300
         ease-in-out
        ${
          theme === "dark"
            ? "bg-gradient-to-tr from-gray-700 via-gray-600 to-gray-700 border-blue-500"
            : "bg-gradient-to-tr from-yellow-200 via-amber-200 to-yellow-100 border-blue-200"
        }`}
        whileHover={{ scale: 1.05, rotate: 1 }}
      />
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
  );
}
