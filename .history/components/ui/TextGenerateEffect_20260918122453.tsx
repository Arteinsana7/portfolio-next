"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const lines = words.split("\n");

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

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {lines.map((line, lineIdx) => (
          <div key={lineIdx}>
            {line.split(" ").map((word, idx) => {
              const colorClass = (word === "Développeuse" || word === "créative" || word === "Designeuse")
                ? "text-purple"
                : "dark:text-white text-black";
              return (
                <motion.span
                  key={word + lineIdx + idx}
                  className={`${colorClass} opacity-0`}
                >
                  {word}{" "}
                </motion.span>
              );
            })}
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="py-4">
        <div className="dark:text-white text-black leading-snug tracking-wide py-1">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};