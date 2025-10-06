import { getBlogByID, getBlogs } from "../../lib/blog";

interface BlogPageProps{
    params: { blogid: string }
}

export async function generateStaticParams(){
    const blogs = getBlogs();
    return blogs.map((blog) => ({blogid: blog.id}))
}

export default async function Blog({ params }: BlogPageProps){
    const blog = await getBlogByID(params.blogid)


    return (
        <main>
            <h1>{blog.title}</h1>
            <div dangerouslySetInnerHTML={{__html: blog.contentHtml}}/>
        </main>
    )
}
