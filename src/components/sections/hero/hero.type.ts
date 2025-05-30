export type HeroDataProps = {
  slug: string;
  title: string;
  type: "home";
  metadata: {
    heading: string;
    animation_sequence_text: {
      text: string;
    }[];
    subheading: string;
    icons: {
      name: string;
      url: string;
    }[];
    image_url: {
      url: string;
      imgix_url: string;
    };
  };
};
