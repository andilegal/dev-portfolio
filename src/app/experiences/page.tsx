import { Journey } from "@/components";
import { ExperienceDataProps } from "@/components/journey/journey.type";
import { fetchPageBySlug } from "@/services/get-page-by-slug";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Experiências | Anderson",
    description:
      "Veja a trajetória profissional de Anderson, suas experiências, empresas e aprendizados ao longo dos anos.",
    openGraph: {
      title: "Experiências | Anderson",
      description:
        "Veja a trajetória profissional de Anderson, suas experiências, empresas e aprendizados ao longo dos anos.",
      url: `${process.env.NEXT_PUBLIC_URL_FINAL}/experiences`,
      siteName: "Anderson.dev",
      images: [
        {
          url: "/favicon.ico",
          width: 1200,
          height: 630,
          alt: "Imagem de fundo com histórico de experiências",
        },
      ],
      locale: "us_EN",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Experiences() {
  const data: ExperienceDataProps = await fetchPageBySlug("experiences");
  return <Journey data={data} />;
}
