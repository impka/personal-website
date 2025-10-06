import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type Blog from "@/types/blog";

const blogsDir = path.join(process.cwd(), "content/blogs")

export function getBlogs() {
    const blogs = fs.readdirSync(blogsDir);

    return blogs.map((blogname) => {
        const filePath = path.join(blogsDir, blogname);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent)

        return {
            id: blogname.replace(/\.md$/, ""),
            title: data.title as string,
            date: data.date as string,
        };
    });
}

export async function getBlogByID(id: string): Promise<Blog> {
    const filePath = path.join(blogsDir, `${id}.md`);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContent);

    const processedContent = await remark()
        .use(html)
        .process(content);
    
    return {
        id,
        title: data.title as string,
        date: data.date as string,
        contentHtml: processedContent.toString()
    }
}