import Image from "next/image"

function AboutMe(){
    return (
        <div id="about-me" className="h-screen flex flex-row justify-center align-center">
            <Image 
            src="/next.svg" 
            alt="picture of me" 
            width={15} 
            height={15}/>
            <div className="h-12">
                <h1>Hello this is a title</h1>
                <p>and this is a descrpition!</p>
            </div>
        </div>
    )
}

export default AboutMe