import { Hero } from "@/components";
import { fetchPageBySlug } from "@/services/get-page-by-slug";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Início | Anderson",
    description:
      "Desenvolvedor Front-End focado em acessibilidade, performance e usabilidade.",
    openGraph: {
      title: "Início | Anderson",
      description:
        "Desenvolvedor Front-End focado em acessibilidade, performance e usabilidade.",
      url: `${process.env.NEXT_PUBLIC_URL_FINAL}/`,
      siteName: "Anderson",
      images: [
        {
          url: `/favicon.icon`,
          width: 1200,
          height: 630,
          alt: "Imagem da homepage com nome Anderson.dev",
        },
      ],
      locale: "pt_BR",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home() {
  const data = await fetchPageBySlug("home");

  return (
    <main>
      <Hero data={data} />
    </main>
  );
}
