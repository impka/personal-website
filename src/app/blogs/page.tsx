import styles from './page.module.css'
import Link from 'next/link'

function Blogs(){
    return (
        <>
            <div className='grid min-h-screen p-1'>
                <div className="">
                    <Link className="underline-hover" href="/"> Back Home</Link>
                </div>

            </div>
        </>
    )
}

export default Blogs