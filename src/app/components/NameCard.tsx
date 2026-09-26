"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import about from "@/content/about";

// delays keep the card from flickering when the pointer just passes over the name
const OPEN_DELAY = 120;
const CLOSE_DELAY = 220;

function Sparkle({ className, delay }: { className: string; delay: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ animationDelay: delay }}
      className={`absolute pointer-events-none fill-amber-600 dark:fill-[#ffcc66] drop-shadow-[0_0_4px_rgb(255_204_102/0.8)] animate-twinkle motion-reduce:animate-none motion-reduce:opacity-70 ${className}`}
    >
      <path d="M8 0C8.6 5 11 7.4 16 8 11 8.6 8.6 11 8 16 7.4 11 5 8.6 0 8 5 7.4 7.4 5 8 0Z" />
    </svg>
  );
}

export default function NameCard() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastPointer = useRef<string>("mouse");

  const schedule = (next: boolean, delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(next), delay);
  };
  // hover only applies to a real mouse; touch opens and closes by tapping
  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") schedule(true, OPEN_DELAY);
  };
  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") schedule(false, CLOSE_DELAY);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  // close on Esc, and on a tap or click anywhere else
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <h1 className="text-5xl leading-none lg:text-[8vh]">
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="about-card"
          onPointerDown={(e) => (lastPointer.current = e.pointerType)}
          onClick={(e) => {
            clearTimeout(timer.current);
            // a mouse has already opened it by hovering, so a mouse click keeps it open;
            // taps and Enter/Space (detail 0) toggle
            const keyboard = e.detail === 0;
            setOpen((o) =>
              !keyboard && lastPointer.current === "mouse" ? true : !o,
            );
          }}
          onFocus={(e) => {
            if (e.currentTarget.matches(":focus-visible")) setOpen(true);
          }}
          onBlur={(e) => {
            // only when focus moves to another control; clicks elsewhere are handled above
            if (
              e.relatedTarget &&
              !wrapperRef.current?.contains(e.relatedTarget)
            )
              setOpen(false);
          }}
          className="relative cursor-pointer"
        >
          Ethan Zhou
          <Sparkle
            delay="0s"
            className="-top-[0.2em] -right-[0.4em] w-[0.34em] h-[0.34em]"
          />
          <Sparkle
            delay="0.9s"
            className="top-[0.3em] -right-[0.62em] w-[0.18em] h-[0.18em]"
          />
          <Sparkle
            delay="1.8s"
            className="-top-[0.05em] -left-[0.3em] w-[0.2em] h-[0.2em]"
          />
        </button>
      </h1>

      {/* static wrapper handles placement, motion.div handles the animation */}
      <div
        id="about-card"
        className="absolute z-20 top-full left-1/2 -translate-x-1/2 mt-4 w-[min(90vw,28rem)] lg:top-auto lg:bottom-full lg:left-0 lg:translate-x-0 lg:mt-0 lg:mb-[3vh] lg:w-[30rem]"
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex gap-4 p-4 rounded-3xl text-left bg-[#F9F9F9] dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-800 shadow-xl"
            >
              <Image
                src={about.photo.src}
                width={about.photo.width}
                height={about.photo.height}
                alt={about.photo.alt}
                className="w-24 h-24 shrink-0 object-cover rounded-2xl lg:w-28 lg:h-28"
              />
              <div className="grid gap-1 content-start">
                <p className="text-xl font-light">{about.greeting}</p>
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {about.bio}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
