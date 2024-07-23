"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  lines?: { text: string; colorClass?: string }[]; // Make lines optional
  className?: string;
}

export const TextGenerateEffect = ({
  lines = [], // Default to an empty array if not provided
  className,
}: TextGenerateEffectProps) => {
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

  const renderLines = () => {
    if (lines.length === 0) return null; // Early return if no lines are provided

    return (
      <motion.div ref={scope}>
        {lines.map((line, lineIdx) => (
          <div key={lineIdx} className="my-2">
            {line.text.split(" ").map((word, wordIdx) => (
              <motion.span
                key={word + wordIdx}
                className={`${line.colorClass || "dark:text-white text-black"} opacity-0`}
              >
                {word}{" "}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {renderLines()}
        </div>
      </div>
    </div>
  );
};