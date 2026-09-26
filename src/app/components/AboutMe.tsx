import Image from "next/image";
import SectionCard from "./SectionCard";
import about from "@/content/about";

function AboutMe() {
  return (
    <SectionCard id="about-me" title="About">
      <div className="grid gap-6 items-center lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
        <Image
          src={about.photo.src}
          width={about.photo.width}
          height={about.photo.height}
          alt={about.photo.alt}
          className="w-full max-w-md aspect-square object-cover rounded-2xl"
        />
        <div className="grid gap-3 max-w-prose">
          <p className="text-2xl font-light">{about.greeting}</p>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            {about.bio}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

export default AboutMe;
