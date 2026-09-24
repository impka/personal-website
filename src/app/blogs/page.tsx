import Link from 'next/link'
import type { Metadata } from 'next'
import { getBlogs } from '../lib/blog'

export const metadata: Metadata = {
    title: 'Blogs | impkar',
}

function Blogs(){
    const blogs = getBlogs()
    
    return (
        <>
            <div className='min-h-screen p-1'>
                <div className="m-2 p-1 border-b">
                    <Link className="underline-hover text-xl" href="/"> Back Home</Link>
                </div>
                <div>
                    <ul className='flex flex-col gap-3 px-3 text-xl'>
                        {blogs.map((blog) => (
                            <li key={blog.id}>
                                <Link href={`/blogs/${blog.id}`} className='block bg-white dark:bg-[#111] p-2 rounded-lg shadow-md transition duration-250 ease-in-out hover:bg-[#F0F0F0] dark:hover:bg-[#1a1a1a] hover:scale-101'>
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