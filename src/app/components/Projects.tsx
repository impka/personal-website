import Image from "next/image"

function Projects(){
    return (
        <div id="projects" className="h-screen place-items-center">
            <Image 
            src="/next.svg" 
            alt="picture of me" 
            width={15} 
            height={15}/>
        </div>
    )
}

export default Projects