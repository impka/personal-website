"use client"

import { FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";

import { useState, useEffect } from "react";
import Scene from "./components/Scene"
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Loading from "./components/Loading";
import Link from "next/link";

import LightContext from "./contexts/LightContext";
import { IoMdMail } from "react-icons/io";

export default function Home() {

  const [on, setOn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (!on) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [on]);


  return (
    <LightContext.Provider value={{value: on, setValue: setOn}}>
      <div className= "bg-[#E0E0E0] dark:bg-black transition-colors duration-500 ease-in-out relative text-black dark:text-white">
        
        { loading && (
          <div className="fixed h-screen inset-0 flex items-center justify-center z-50 bg-blue-500">
            <Loading />
          </div>
        )}
        <div className="h-screen ">
          <Scene onLoaded={() => setLoading(false)}/>
          <div className="flex flex-row items-center justify-center absolute top-[40vh] right-[60vh]">
            <div className="pr-[2vh]">
              <h1 className="text-[7vh]">Ethan Zhou</h1>
              <div className="flex flex-row items-center justify-center gap-[1vh]">
                <a href="https://github.com/impka" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="w-[4vh] h-[4vh] text-black dark:text-white hover:text-gray-500 transition" />
                </a>
                <a href="https://github.com/impka" target="_blank" rel="noopener noreferrer">
                  <IoMdMail className="w-[4vh] h-[4vh] text-black dark:text-white hover:text-gray-500 transition" />
                </a>
              </div>
            </div>
            <ul className="text-[3vh]">
              <li><Link className="underline-hover" href="#about-me">About</Link></li>
              <li><Link className="underline-hover" href="#projects">Projects</Link></li>
              <li><Link className="underline-hover hover:animate-wiggle" href="/blogs">Blogs</Link></li>
            </ul>
          </div>
        </div>
        <AboutMe/>
        <Projects/>
      </div>
    </LightContext.Provider>
  );
}
