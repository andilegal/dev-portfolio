export type ProjectPageProps = {
  slug: "projects";
  title: "projects";
  type: "projects";
  metadata: {
    heading: string;
    projects: Project[]
  };
};

export type Project = {
  title: string;
  description: string;
  technologies: string;
  demourl?: string;
  githuburl?: string;
  image?: {
    url?: string
  };
};