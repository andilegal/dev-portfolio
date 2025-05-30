import { HeroDataProps } from "@/components/hero/hero.type";
import {
  SiEjs,
  SiAngular,
  SiFirebase,
  SiDocker,
  SiCypress,
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiGit,
} from "react-icons/si";

import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  Facebook,
} from "lucide-react";

export function createSequence(
  array: HeroDataProps["metadata"]["animation_sequence_text"]
): (string | number)[] {
  return array.reduce(
    (acc: (string | number)[], item: { text: string }, index: number) => {
      acc.push(item.text);
      if (index < array.length) {
        acc.push(3000);
      }
      return acc;
    },
    []
  );
}

export const socialIcons = {
  Github: Github,
  Linkedin: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
  Mail: Mail,
  Facebook: Facebook,
  Phone: Phone,
};

export const skills = [
  { name: "Vue.js", icon: <SiEjs className="w-14 h-14 text-[#42b883]" /> },
  { name: "Angular", icon: <SiAngular className="w-14 h-14 text-[#dd0031]" /> },
  {
    name: "Firebase",
    icon: <SiFirebase className="w-14 h-14 text-[#FFCA28]" />,
  },
  { name: "Docker", icon: <SiDocker className="w-14 h-14 text-[#2496ED]" /> },
  { name: "Cypress", icon: <SiCypress className="w-14 h-14 text-[#17202c]" /> },
  {
    name: "TypeScript",
    icon: <SiTypescript className="w-14 h-14 text-[#007ACC]" />,
  },
  { name: "React", icon: <SiReact className="w-14 h-14 text-[#61DAFB]" /> },
  {
    name: "Next.js",
    icon: (
      <SiNextdotjs
        className="w-14 h-14"
        style={{ color: "var(--nextjs-icon-color)" }}
      />
    ),
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="w-14 h-14 text-[#339933]" />,
  },
  { name: "MongoDB", icon: <SiMongodb className="w-14 h-14 text-[#47A248]" /> },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss className="w-14 h-14 text-[#06B6D4]" />,
  },
  {
    name: "Git & GitHub",
    icon: <SiGit className="w-14 h-14 text-[#F05032]" />,
  },
];
