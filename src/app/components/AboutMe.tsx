import Image from "next/image"

function AboutMe(){
    return (
        <div id="about-me" className="relative h-screen flex flex-row justify-center items-center bg-transparent z-20">
            <Image 
            src="/next.svg" 
            alt="picture of me" 
            width={150} 
            height={50}/>
            <div className="h-12 pl-15">
                <h1>Hello this is a title</h1>
                <p>and this is a descrpition!</p>
            </div>
        </div>
    )
}

export default AboutMe