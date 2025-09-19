import Image from "next/image"

function AboutMe(){
    return (
        <>
            <Image 
            src="/next.svg" 
            alt="picture of me" 
            width={15} 
            height={15}/>
        </>
    )
}

export default AboutMe