import { WorkDisplay } from "@/components";
import { fetchPageBySlug } from "@/services/get-page-by-slug";
import { ProjectPageProps } from "./projects.type";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data: ProjectPageProps = await fetchPageBySlug("projects");
  return {
    title: `${data.title} | Anderson Dev`,
    description:
      "Veja os principais projetos desenvolvidos por Anderson, com foco em front-end moderno, acessibilidade e performance.",
    openGraph: {
      title: "Projetos | Anderson Dev",
      description: "Veja os principais projetos desenvolvidos por Anderson.",
      url: `${process.env.NEXT_PUBLIC_URL_FINAL}/projects`,
      siteName: "Anderson Dev",
      type: "website",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | Anderson Dev`,
      description: "Veja os principais projetos desenvolvidos por Anderson.",
    },
  };
}

export default async function Projects() {
  const data: ProjectPageProps = await fetchPageBySlug("projects");

  return <WorkDisplay data={data} />;
}
