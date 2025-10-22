import Image from "next/image"

function AboutMe(){
    return (
        <div id="about-me" className="relative h-screen grid place-items-center bg-transparent z-3">
            <div className="h-[80vh] w-[80vw] flex flex-row items-center gap-10 justify-center bg-[#F9F9F9] dark:bg-[#030303] rounded-[50] shadow-xl transition-colors duration-500 ease-in-out">
                <div className="relative h-[40vh] w-[40vh] rounded-xl bg-[#00FF00] overflow-hidden">
                    <Image 
                    fill
                    src="/snowboarding.webp" 
                    alt="picture of me" 
                    className="object-cover"
                    />
                </div>
                <div className="w-[35%] prose prose-lg prose-slate dark:prose-invert">
                    <h1 className="text-xl font-bold pl-2">Hi!</h1>
                    <p className="text-lg">
                    {"I'm Ethan, a dude who likes doing cool stuff. My interests are pretty broad, since I can get pretty invested in things relatively quickly, but in general, my primary motivation is making the world a more enjoyable place to exist in."}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutMe