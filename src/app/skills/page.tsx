import { SkillsShowcase } from "@/components/skills-showcase";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Habilidades Técnicas | Anderson Dev",
    description:
      "Conheça as principais tecnologias dominadas por Anderson: React, Next.js, TypeScript, Node.js, e muito mais.",
    openGraph: {
      title: "Habilidades Técnicas | Anderson Dev",
      description: "Conheça as principais tecnologias dominadas por Anderson.",
      url: `${process.env.NEXT_PUBLIC_URL_FINAL}/skills`,
      siteName: "Anderson Dev",
      type: "website",
      locale: "us_EN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Habilidades Técnicas | Anderson Dev",
      description: "Conheça as principais tecnologias dominadas por Anderson.",
    },
  };
};

export default function Skills() {
  return <SkillsShowcase />;
}
