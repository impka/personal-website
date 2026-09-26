import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type Blog from "@/types/blog";
import type { BlogSummary } from "@/types/blog";

const blogsDir = path.join(process.cwd(), "content/blogs");
const WORDS_PER_MINUTE = 220;
const EXCERPT_LENGTH = 180;

// markdown syntax stripped down to readable text for excerpts
function toPlainText(markdown: string) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// the first paragraph of body text, cut at a word boundary; heading and image lines are
// dropped line by line because a heading can sit directly on top of a paragraph
function getExcerpt(content: string) {
  const paragraph =
    content
      .split(/\n\s*\n/)
      .map((block) =>
        block
          .split("\n")
          .filter((line) => !/^\s*(#|!\[)/.test(line))
          .join(" ")
          .trim(),
      )
      .find(Boolean) ?? "";
  const text = toPlainText(paragraph);
  if (text.length <= EXCERPT_LENGTH) return text;
  return text.slice(0, text.lastIndexOf(" ", EXCERPT_LENGTH)) + "…";
}

function getCover(content: string) {
  const match = content.match(/!\[([^\]]*)\]\(([^)\s]+)/);
  return match ? { alt: match[1], src: match[2] } : undefined;
}

export function getBlogs(): BlogSummary[] {
  const blogs = fs.readdirSync(blogsDir).filter((name) => name.endsWith(".md"));

  return blogs
    .map((blogname) => {
      const filePath = path.join(blogsDir, blogname);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);
      const words = content.split(/\s+/).filter(Boolean).length;

      return {
        id: blogname.replace(/\.md$/, ""),
        title: data.title as string,
        date: data.date as string | undefined,
        category: data.categories as string | undefined,
        excerpt: getExcerpt(content),
        readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
        cover: getCover(content),
      };
    })
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export async function getBlogByID(id: string): Promise<Blog> {
  const filePath = path.join(blogsDir, `${id}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);

  return {
    id,
    title: data.title as string,
    date: data.date as string | undefined,
    contentHtml: processedContent.toString(),
  };
}
