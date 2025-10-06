import Link from 'next/link'
import { getBlogs } from '../lib/blog'

function Blogs(){
    const blogs = getBlogs()
    
    return (
        <>
            <div className='min-h-screen p-1'>
                <div className="m-2 p-1 border-b">
                    <Link className="underline-hover" href="/"> Back Home</Link>
                </div>
                <div>
                    <ul>
                        {blogs.map((blog) => (
                            <li key={blog.id}>
                                <Link href={`/blogs/${blog.id}`}>
                                    {blog.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Blogs