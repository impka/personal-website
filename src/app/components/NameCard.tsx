"use client";

import Image from "next/image";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import about from "@/content/about";

const NAME = "Ethan Zhou";
// fixed, scattered start times (seconds into the 6s cycle) so letters light up one or two at a time;
// fixed values also keep server and client markup identical
const TWINKLE_DELAYS = [0.4, 3.1, 1.7, 4.6, 2.3, 0, 5.2, 0.9, 3.8, 2.9];

// delays keep the card from flickering when the pointer just passes over the name
const OPEN_DELAY = 120;
const CLOSE_DELAY = 220;
// room the card needs above the name on desktop before it flips below instead
const SPACE_NEEDED_ABOVE = 260;

// lets other controls (the "About" nav link) open the card
export interface NameCardHandle {
  open: () => void;
}

export default function NameCard({ ref }: { ref?: React.Ref<NameCardHandle> }) {
  const [open, setOpen] = useState(false);
  const [below, setBelow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastPointer = useRef<string>("mouse");

  const show = () => {
    const top = wrapperRef.current?.getBoundingClientRect().top ?? 0;
    setBelow(top < SPACE_NEEDED_ABOVE);
    setOpen(true);
  };
  const schedule = (next: boolean, delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => (next ? show() : setOpen(false)), delay);
  };
  // hover only applies to a real mouse; touch opens and closes by tapping
  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") schedule(true, OPEN_DELAY);
  };
  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") schedule(false, CLOSE_DELAY);
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      clearTimeout(timer.current);
      show();
    },
  }));

  useEffect(() => () => clearTimeout(timer.current), []);

  // close on Esc, and on a tap or click anywhere else
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // focus stays where it is (the name or the About link); moving it to the name would reopen the card
      if (e.key !== "Escape") return;
      setOpen(false);
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

  // phones always open below the centered name; desktop opens above unless there's no room
  // when below, sit close enough to the name to fully cover the icon row underneath it
  const placement = below
    ? "top-full left-1/2 -translate-x-1/2 mt-2 lg:left-0 lg:translate-x-0"
    : "top-full left-1/2 -translate-x-1/2 mt-2 lg:top-auto lg:bottom-full lg:left-0 lg:translate-x-0 lg:mt-0 lg:mb-[3vh]";
  const caretBelow = "-top-[7px] border-l border-t";
  const caret = below
    ? `${caretBelow} left-1/2 -translate-x-1/2 lg:left-10 lg:translate-x-0`
    : `${caretBelow} left-1/2 -translate-x-1/2 lg:top-auto lg:-bottom-[7px] lg:left-10 lg:translate-x-0 lg:border-l-0 lg:border-t-0 lg:border-r lg:border-b`;

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <h1 className="text-5xl leading-none lg:text-[8vh]">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="about-card"
          onPointerDown={(e) => (lastPointer.current = e.pointerType)}
          onClick={(e) => {
            clearTimeout(timer.current);
            // a mouse has already opened it by hovering, so a mouse click keeps it open;
            // taps and Enter/Space (detail 0) toggle
            const keyboard = e.detail === 0;
            if ((!keyboard && lastPointer.current === "mouse") || !open) show();
            else setOpen(false);
          }}
          onFocus={(e) => {
            if (e.currentTarget.matches(":focus-visible")) show();
          }}
          onBlur={(e) => {
            // only when focus moves to another control; clicks elsewhere are handled above
            if (
              e.relatedTarget &&
              !wrapperRef.current?.contains(e.relatedTarget)
            )
              setOpen(false);
          }}
          className="cursor-pointer [--name-color:#000] [--twinkle:#d97706] dark:[--name-color:#fff] dark:[--twinkle:#ffcc66]"
        >
          {[...NAME].map((char, i) =>
            char === " " ? (
              " "
            ) : (
              <span
                key={i}
                style={{ animationDelay: `${TWINKLE_DELAYS[i]}s` }}
                className="text-(--name-color) animate-twinkle motion-reduce:animate-none"
              >
                {char}
              </span>
            ),
          )}
        </button>
      </h1>

      {/* static wrapper handles placement, motion.div handles the animation */}
      <div
        id="about-card"
        className={`absolute z-20 w-[min(90vw,24rem)] lg:w-[32rem] ${placement}`}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: below ? -6 : 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: below ? -6 : 6, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative text-left"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_7rem] overflow-hidden rounded-3xl border border-neutral-200 bg-[#F9F9F9] shadow-2xl dark:border-neutral-800 dark:bg-[#0d0d0d] lg:grid-cols-[minmax(0,1fr)_10rem]">
                <div className="flex flex-col justify-center gap-1.5 p-5 lg:p-6">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                    About me
                  </span>
                  <p className="text-xl font-light leading-tight">
                    {about.greeting}
                  </p>
                  <p className="text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300 lg:text-sm">
                    {about.bio}
                  </p>
                </div>
                <Image
                  src={about.photo.src}
                  width={about.photo.width}
                  height={about.photo.height}
                  alt={about.photo.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* small pointer joining the card to the name */}
              <span
                aria-hidden="true"
                className={`absolute h-3.5 w-3.5 rotate-45 border-neutral-200 bg-[#F9F9F9] dark:border-neutral-800 dark:bg-[#0d0d0d] ${caret}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
