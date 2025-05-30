import Link from "next/link";

export const metadata = {
  title: "Página Não Encontrada | Anderson.dev",
  description: "Desculpe, a página que você procura não existe.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <h1 className="text-5xl font-bold mb-4">Página Não Encontrada</h1>
      <p className="text-lg mb-6">
        Desculpe, a página que você procura não existe.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-2 rounded-full font-semibold shadow bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
      >
        Voltar para Início
      </Link>
    </main>
  );
}
