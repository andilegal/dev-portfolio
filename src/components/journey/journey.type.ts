import { JSX } from "react";

export type ExperienceDataProps = {
  slug: string;
  title: string;
  type: string;
  metadata: {
    heading: string;
    experiences: ExperienceProps[];
  };
};

export type ExperienceProps = {
  title: string;
  company: string;
  period: string;
  description: string;
  icon: JSX.Element;
  current?: boolean;
};




