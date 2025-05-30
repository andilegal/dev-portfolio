export type ProjectPageProps = {
  slug: string;
  title: string;
  type: string;
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