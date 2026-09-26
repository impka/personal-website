export default interface Project {
  id: string;
  title: string;
  year: number;
  description: string;
  stack: string[];
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    // diagrams should be shown whole instead of cropped
    fit?: "cover" | "contain";
  };
  links: { label: string; href: string }[];
}
