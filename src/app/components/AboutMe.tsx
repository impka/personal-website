import Image from "next/image";
import SectionCard from "./SectionCard";

function AboutMe() {
  return (
    <SectionCard id="about-me" title="About">
      <div className="grid gap-6 items-center lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
        <Image
          src="/snowboarding.webp"
          width={1276}
          height={958}
          alt="My snowboard and boots on a ski slope, with mountains behind"
          className="w-full max-w-md aspect-square object-cover rounded-2xl"
        />
        <div className="grid gap-3 max-w-prose">
          <p className="text-2xl font-light">Hi!</p>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            {
              "I'm Ethan, a dude who likes doing cool stuff. My interests are pretty broad, since I can get pretty invested in things relatively quickly, but in general, my primary motivation is making the world a more enjoyable place to exist in."
            }
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

export default AboutMe;
