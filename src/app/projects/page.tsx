import { WorkDisplay } from "@/components";
import { fetchPageBySlug } from "@/services/get-page-by-slug";
import { ProjectPageProps } from "./projects.type";

export default async function Projects() {
  const data: ProjectPageProps = await fetchPageBySlug("projects");

  return <WorkDisplay data={data} />;
}
