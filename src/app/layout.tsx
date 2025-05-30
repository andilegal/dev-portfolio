import type { Metadata } from "next";
import "./globals.css";
import { Menu } from "@/components";
import { ThemeProvider } from "next-themes";
import { getMenu } from "@/services/get-menu";
import { MenuItemProps } from "@/components/layout/menu/menu.type";

export const metadata: Metadata = {
  title:
    "Anderson.dev | Desenvolvedor Front-End com Next.js, React e TypeScript",
  description:
    "Portfólio de Anderson, desenvolvedor front-end especializado em interfaces modernas com Next.js, React, TypeScript e boas práticas de performance, acessibilidade e responsividade.",
  keywords: [
    "Desenvolvedor Front-End",
    "Portfólio de Desenvolvedor",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Desenvolvimento Web",
    "Interfaces Modernas",
    "Sites Responsivos",
    "Acessibilidade Web",
    "Performance Web",
  ],
  authors: [{ name: "Anderson", url: `${process.env.NEXT_PUBLIC_URL_FINAL}/` }],
  creator: "Anderson",
  publisher: "Anderson.dev",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL_FINAL}/`),
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  openGraph: {
    title: "Anderson.dev | Desenvolvedor Front-End com Next.js e React",
    description:
      "Conheça os projetos e experiências de Anderson, desenvolvedor web com foco em Next.js, React, TypeScript, usabilidade, acessibilidade e performance.",
    url: `${process.env.NEXT_PUBLIC_URL_FINAL}/`,
    siteName: "Anderson.dev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anderson.dev - Portfólio de Desenvolvedor Front-End",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anderson.dev | Projetos com Next.js, React e TypeScript",
    description:
      "Explore os projetos de Anderson, especialista em desenvolvimento front-end moderno com React, Next.js e TypeScript.",
    site: "@andilegal1",
    creator: "@andilegal1",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items: MenuItemProps[] = await getMenu();

  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="dark"
          storageKey="theme"
        >
          <Menu data={items} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
