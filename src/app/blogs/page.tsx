import Link from 'next/link'
import { getBlogs } from '../lib/blog'

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
                            <Link key={blog.id} href={`/blogs/${blog.id}`}>
                                <li className='bg-white p-2 rounded-lg shadow-md transition duration-250 ease-in-out hover:bg-[#F0F0F0] hover:scale-101'>
                                        {blog.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Blogs