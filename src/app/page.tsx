"use client"

import { useState } from "react";
import Scene from "./components/Scene"
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Link from "next/link";

import LightContext from "./contexts/LightContext";

export default function Home() {

  const [on, setOn] = useState(false);

  return (
    <LightContext value={{value: on, setValue: setOn}}>
      <div className={`
        ${on? "bg-white" : "bg-black"}
        transition-colors duration-500 ease-in-out
        h-screen 
        relative`}>
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
    </LightContext>
  );
}
