import Image from "next/image";

function AboutMe() {
  return (
    <div
      id="about-me"
      className="relative min-h-screen grid place-items-center bg-transparent z-3"
    >
      <div className="min-h-[80vh] w-[90vw] p-8 flex flex-col items-center gap-10 justify-center lg:w-[80vw] lg:p-0 lg:flex-row bg-[#F9F9F9] dark:bg-[#030303] rounded-[50] shadow-xl transition-colors duration-500 ease-in-out">
        <div className="relative h-[30vh] w-[30vh] shrink-0 lg:h-[40vh] lg:w-[40vh] rounded-xl bg-[#00FF00] overflow-hidden">
          <Image
            fill
            src="/snowboarding.webp"
            alt="picture of me"
            className="object-cover"
          />
        </div>
        <div className="lg:w-[35%] prose prose-lg prose-slate dark:prose-invert">
          <h1 className="text-xl font-bold pl-2">Hi!</h1>
          <p className="text-lg">
            {
              "I'm Ethan, a dude who likes doing cool stuff. My interests are pretty broad, since I can get pretty invested in things relatively quickly, but in general, my primary motivation is making the world a more enjoyable place to exist in."
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
