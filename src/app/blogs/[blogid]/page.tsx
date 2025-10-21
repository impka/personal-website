import { getBlogByID, getBlogs } from "../../lib/blog";
import Link from "next/link";

interface BlogPageProps{
    params: { blogid: string }
}

export async function generateStaticParams(){
    const blogs = getBlogs();
    return blogs.map((blog) => ({blogid: blog.id}))
}

export default async function Blog({ params }: BlogPageProps){
    params = await params;
    const blog = await getBlogByID(params.blogid);


    return (
        <div>
            <div className="fixed top-0 left-0 m-3">
                <Link className="underline-hover text-xl" href="/blogs"> Back to Blogs</Link>
            </div>
            <main className="grid place-items-center p-10">
                <article className="prose prose-lg prose-slate dark:prose-invert">
                    <div dangerouslySetInnerHTML={{__html: blog.contentHtml}}/>
                </article>
            </main>
        </div>
    )
}
