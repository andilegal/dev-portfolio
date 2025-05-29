import { Hero } from "@/components";
import { fetchPageBySlug } from "@/services/get-page-by-slug";

export default await async function Home() {
  const data = await fetchPageBySlug("home");
  return (
    <main>
      <Hero data={data} />
    </main>
  );
};
