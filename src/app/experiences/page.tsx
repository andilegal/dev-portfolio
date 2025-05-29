import { Journey } from "@/components";
import { ExperienceDataProps } from "@/components/journey/journey.type";
import { fetchPageBySlug } from "@/services/get-page-by-slug";

export default async function Experiences() {
  const data: ExperienceDataProps = await fetchPageBySlug("experiences");
  return <Journey data={data} />;
}
