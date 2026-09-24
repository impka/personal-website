"use client";

import { FaGithub, FaSpotify } from "react-icons/fa";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scene from "./components/Scene";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Loading from "./components/Loading";
import Link from "next/link";

import LightContext from "./contexts/LightContext";
import { IoMdMail } from "react-icons/io";

export default function Home() {
  // the theme script in layout.tsx has already applied the saved choice
  const [on, setOn] = useState(
    () =>
      typeof document !== "undefined" &&
      !document.documentElement.classList.contains("dark"),
  );
  const [loading, setLoading] = useState(true);
  const handleLoaded = useCallback(() => setLoading(false), []);

  // don't leave the overlay up forever if WebGL or the model fails to load
  useEffect(() => {
    const timeout = setTimeout(handleLoaded, 8000);
    return () => clearTimeout(timeout);
  }, [handleLoaded]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", !on);
    try {
      localStorage.setItem("light", on ? "on" : "off");
    } catch {}
  }, [on]);

  return (
    <LightContext.Provider value={{ value: on, setValue: setOn }}>
      <div className="bg-[#E0E0E0] dark:bg-black transition-colors duration-500 ease-in-out relative text-black dark:text-white">
        <AnimatePresence>
          {loading && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 bg-[#000000]"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Loading />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="h-screen ">
          <button
            onClick={() => setOn((prev) => !prev)}
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-10 focus:px-3 focus:py-1 focus:rounded focus:bg-white focus:text-black"
          >
            Toggle lights
          </button>
          <Scene onLoaded={handleLoaded} />
          <div className="absolute inset-x-0 top-[10vh] flex flex-col items-center gap-4 lg:inset-x-auto lg:top-[40vh] lg:right-[60vh] lg:flex-row lg:gap-0">
            <div className="lg:pr-[2vh]">
              <h1 className="text-5xl lg:text-[7vh]">Ethan Zhou</h1>
              <div className="mt-3 flex flex-row items-center justify-center gap-4 lg:mt-0 lg:gap-[1vh]">
                <a
                  href="https://github.com/impka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-8 h-8 lg:w-[4vh] lg:h-[4vh] text-black dark:text-white hover:text-gray-500 transition" />
                </a>
                <a
                  href="mailto:ethanzhou008@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoMdMail className="w-8 h-8 lg:w-[4vh] lg:h-[4vh] text-black dark:text-white hover:text-gray-500 transition" />
                </a>
                <a
                  href="https://open.spotify.com/user/eu9hi6okg9tt30m94zbmu9nmi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSpotify className="w-8 h-8 lg:w-[4vh] lg:h-[4vh] text-black dark:text-white hover:text-gray-500 transition" />
                </a>
              </div>
            </div>
            <ul className="flex flex-row gap-6 text-xl lg:block lg:text-[3vh]">
              <li>
                <Link className="underline-hover" href="#about-me">
                  About
                </Link>
              </li>
              <li>
                <Link className="underline-hover" href="#projects">
                  Projects
                </Link>
              </li>
              <li>
                <a
                  className="underline-hover hover:animate-wiggle"
                  href="/blogs"
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>
        </div>
        <AboutMe />
        <Projects />
      </div>
    </LightContext.Provider>
  );
}
