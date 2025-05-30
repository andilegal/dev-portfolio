import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  textColor: string;
}

export function SkillCard({
  name,
  icon,
  cardBg,
  cardBorder,
  cardShadow,
  textColor,
}: SkillCardProps) {
  return (
    <motion.li
      className="rounded-2xl p-6 sm:p-8 border cursor-default flex flex-col items-center justify-center gap-4 text-center transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03]"
      style={{
        background: cardBg,
        borderColor: cardBorder,
        boxShadow: cardShadow,
      }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      tabIndex={0}
      role="group"
      aria-label={name}
    >
      <div>{icon}</div>
      <span
        className={`text-base sm:text-lg md:text-xl font-semibold ${textColor}`}
      >
        {name}
      </span>
    </motion.li>
  );
}
