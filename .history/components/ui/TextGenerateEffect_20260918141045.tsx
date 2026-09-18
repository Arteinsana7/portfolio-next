"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  mobileWords,
  className,
}: {
  words: string;
  mobileWords?: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [animate]);

  const renderLines = (text: string, keyPrefix: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => (
      <div key={keyPrefix + lineIdx} className="whitespace-nowrap">
        {line.split(" ").map((word, idx) => {
          const colorClass =
            word === "Designeuse" || word === "Développeuse"
              ? "text-purple"
              : "dark:text-white text-black";
          return (
            <motion.span
              key={keyPrefix + word + lineIdx + idx}
              className={`${colorClass} opacity-0`}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </div>
    ));
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="py-4">
        <div
          ref={scope}
          className="dark:text-white text-black leading-snug tracking-wide py-1"
        >
          {/* Version mobile */}
          <div className={mobileWords ? "block md:hidden" : "hidden"}>
            {renderLines(mobileWords ?? "", "mobile")}
          </div>
          {/* Version desktop */}
          <div className={mobileWords ? "hidden md:block" : "block"}>
            {renderLines(words, "desktop")}
          </div>
        </div>
      </div>
    </div>
  );
};