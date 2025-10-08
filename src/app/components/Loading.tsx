import Image from "next/image"

function Loading(){
    return (
        <div className="grid place-items-center">
            <h1><i>Loading</i></h1>
            <Image 
                src="/loading.svg" 
                alt="picture of gears" 
                width={50} 
                height={50}/>
        </div>
    )
}

export default Loading