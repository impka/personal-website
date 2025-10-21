"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const projects = [
    {
      id: 1,
      title: "Where's Waldo Website",
      link: "https://github.com/impka/waldo",
      desc: "A express + react based website for playing Where's Waldo.",
      img: "/project_images/waldo.png",
    },
    {
      id: 2,
      title: "Mine Neural Network",
      link: "https://github.com/impka/Mine_NN",
      desc: "A Neural Network made with Pytorch for mine detection.",
      img: "/project_images/landmine.jpeg",
    },
    {
      id: 3,
      title: "Blog API",
      link: "https://github.com/impka/blog-api",
      desc: "A RESTful API built with Express for blogs",
      img: "/project_images/api_rest.png",
    },
    {
      id: 4,
      title: "Personal Website",
      link: "https://github.com/impka/personal-website",
      desc: "A Next.js based website for my ramblings hosted on GitHub Pages",
      img: "/project_images/guy-reading.jpeg"
    }
];

function DragCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
  
    const handleDragEnd = (_: any, info: any) => {
      const offset = info.offset.y;
      const threshold = 100; // drag distance required to change slides
  
      if (offset < -threshold && activeIndex < projects.length - 1)
        setActiveIndex((i) => i + 1);
      else if (offset > threshold && activeIndex > 0)
        setActiveIndex((i) => i - 1);
    };
  
    return (
      <div className="h-screen w-[80vw] flex flex-row items-center justify-center overflow-hidden bg-[#F9F9F9] dark:bg-[#030303] rounded-[50] shadow-xl transition-colors duration-500 ease-in-out">
        <div className="flex items-center justify-center relative w-[40%] max-w-4xl overflow-hidden">
          <motion.div
            key={projects[activeIndex].id}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-[80%] h-[80%] cursor-grab active:cursor-grabbing select-none"
          >
            <Image
              src={projects[activeIndex].img}
              alt={projects[activeIndex].title}
              className="rounded-2xl shadow-2xl w-full object-contain non-draggable"
              width={500}
              height={500}
            />
          </motion.div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === activeIndex ? "bg-[#090909] dark:bg-white h-6" : "bg-gray-500"
              }`}
            />
          ))}
        </div>

        <div className="m-8 text-center w-[50%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={projects[activeIndex].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-2">
                {projects[activeIndex].title}
              </h2>
              <p className="text-gray-400">{projects[activeIndex].desc}</p>
              <a href={projects[activeIndex].link} className="hover:text-gray-500 transition duration-200 ease-in-out">Link to GitHub</a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

function Projects(){
    return (
        <div id="projects" className="h-screen place-items-center bg-transparent">
            <DragCarousel/>
        </div>
    )
}

export default Projects