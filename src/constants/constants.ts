import { HeroDataProps } from "@/components/hero/hero.type";


import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";

export function createSequence(array: HeroDataProps['metadata']['animation_sequence_text']): (string | number)[] {
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
  Phone: Phone,
};