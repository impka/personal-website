import Scene from "./components/Scene"
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white h-screen relative">
      <Scene />
      <div className="flex flex-row items-center justify-center absolute top-40 right-60">
        <div className="pr-2">
          <h1 className="text-black-500 text-4xl">Ethan Zhou</h1>
          <p>Description</p>
        </div>
        <ul>
          <li><Link className="underline-hover" href="#about-me">About</Link></li>
          <li><Link className="underline-hover" href="#projects">Projects</Link></li>
          <li className="hover:animate-wiggle"><Link className="underline-hover" href="/blogs">Blogs</Link></li>
        </ul>
      </div>
      <AboutMe/>
      <Projects/>
    </div>
  );
}
