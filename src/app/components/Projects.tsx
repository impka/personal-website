"use client";

import Image from "next/image";
import { useState } from "react";
import projects from "@/content/projects";

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      className={`w-4 h-4 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-45" : ""}`}
    >
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className="w-3.5 h-3.5"
    >
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((current) => (current === id ? null : id));

  // Esc closes the open row and puts focus back on its button
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Escape" || !openId) return;
    document.getElementById(`project-${openId}-button`)?.focus();
    setOpenId(null);
  };

  return (
    <div
      id="projects"
      className="min-h-screen grid place-items-center bg-transparent"
    >
      <div className="w-[90vw] p-6 sm:p-10 lg:w-[80vw] lg:p-14 bg-[#F9F9F9] dark:bg-[#030303] rounded-[50] shadow-xl transition-colors duration-500 ease-in-out">
        <h2 className="text-3xl font-light mb-6 lg:text-[5vh] lg:mb-10">
          Projects
        </h2>
        <ul onKeyDown={handleKeyDown}>
          {projects.map((project) => {
            const open = openId === project.id;
            const buttonId = `project-${project.id}-button`;
            const panelId = `project-${project.id}-panel`;

            return (
              <li
                key={project.id}
                className="border-t border-neutral-300 last:border-b dark:border-neutral-800"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(project.id)}
                    className="group w-full grid grid-cols-[minmax(0,1fr)_auto_1rem] gap-4 items-center py-5 px-1.5 text-left cursor-pointer lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)_auto_1rem]"
                  >
                    <span className="text-xl lg:text-2xl group-hover:underline underline-offset-4 decoration-1">
                      {project.title}
                    </span>
                    <span className="hidden font-mono text-xs text-neutral-500 truncate lg:block">
                      {project.stack.join(" · ")}
                    </span>
                    <span className="font-mono text-xs text-neutral-500 tabular-nums">
                      {project.year}
                    </span>
                    <PlusIcon open={open} />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!open}
                  className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 px-1.5 pt-1 pb-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
                      <Image
                        src={project.image.src}
                        width={project.image.width}
                        height={project.image.height}
                        alt={project.image.alt}
                        className={`w-full aspect-[3/2] rounded-2xl ${project.image.fit === "contain" ? "object-contain bg-white" : "object-cover"}`}
                      />
                      <div className="grid gap-4 content-start">
                        <p className="max-w-prose text-neutral-700 dark:text-neutral-300">
                          {project.description}
                        </p>
                        <div className="grid gap-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                            Built with
                          </span>
                          <ul className="flex flex-wrap gap-1.5">
                            {project.stack.map((tech) => (
                              <li
                                key={tech}
                                className="font-mono text-xs rounded-full px-2.5 py-1 bg-neutral-200/70 dark:bg-neutral-900"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2.5 pt-1">
                          {project.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
                            >
                              {link.label}
                              <ArrowIcon />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Projects;
