import type Project from "@/types/project";

const projects: Project[] = [
  {
    id: "waldo",
    title: "Where's Waldo Website",
    year: 2025,
    description:
      "Find Waldo in the browser. The React client runs the game and page routing with React Router. An Express server backed by Prisma stores the game data, and Multer handles image uploads.",
    stack: ["React", "React Router", "Express", "Prisma", "Multer"],
    image: {
      src: "/project_images/waldo.png",
      width: 630,
      height: 420,
      alt: "Cartoon of Waldo waving in his red and white striped shirt",
    },
    links: [{ label: "View on GitHub", href: "https://github.com/impka/waldo" }],
  },
  {
    id: "mine-nn",
    title: "Mine Neural Network",
    year: 2025,
    description:
      "Classifies landmine types from the UCI Land Mines dataset, which pairs sensor voltage and height readings with soil type. The model is evaluated with 10-fold cross-validation, and the repo includes the confusion matrix and training-history plots.",
    stack: ["Python", "PyTorch"],
    image: {
      src: "/project_images/landmine.jpeg",
      width: 277,
      height: 182,
      alt: "A round metal landmine partly buried in dry soil",
    },
    links: [
      { label: "View on GitHub", href: "https://github.com/impka/Mine_NN" },
    ],
  },
  {
    id: "blog-api",
    title: "Blog API",
    year: 2025,
    description:
      "Create, read, update and delete blog posts through a RESTful Express API. Posts are stored in a SQL database through Prisma, and writes are protected with JWT auth tokens issued by Passport.js. Next up: a frontend overhaul and a move from JWT to OAuth.",
    stack: ["Express", "TypeScript", "React", "Passport.js", "Prisma"],
    image: {
      src: "/project_images/api_rest.png",
      width: 1155,
      height: 656,
      alt: "Blue cloud logo reading API {REST}",
    },
    links: [
      { label: "View on GitHub", href: "https://github.com/impka/blog-api" },
    ],
  },
  {
    id: "personal-website",
    title: "Personal Website",
    year: 2025,
    description:
      "The site you're on: a statically exported Next.js site. A 3D light bulb built with React Three Fiber switches the whole site between light and dark. Blog posts are Markdown files rendered at build time, and every push to main deploys to GitHub Pages.",
    stack: ["Next.js", "React Three Fiber", "Tailwind CSS", "Framer Motion"],
    image: {
      src: "/project_images/guy-reading.jpeg",
      width: 1080,
      height: 1080,
      alt: "A person reading a book that is on fire",
    },
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/impka/personal-website",
      },
    ],
  },
];

export default projects;
