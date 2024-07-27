"use client"

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";

import { GlobeDemo } from "./GridGlobe";
import Lottie from 'react-lottie-player'
import { useState } from "react";
import animationData from '@/data/confetti.json'
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";
import { useMediaQuery } from 'react-responsive';

// import Image from 'next/image';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["Postgre", "HTML", "JavaScript", "React", "express"];
  const rightLists = ["CSS", "Next", "MySQL", "Kotlin", "Node"];

  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "XMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "e.arteinsana@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const getImageSrc = () => {
    if (isMobile) {
      return img ? img.replace('large', 'small') : null; // Change the image URL as needed
    } else if (isTabletOrMobile) {
      return img ? img.replace('large', 'medium') : null; // Change the image URL as needed
    }
    return img;
  };

  const getSpareImageSrc = () => {
    if (isMobile) {
      return spareImg ? spareImg.replace('large', 'small') : null; // Change the image URL as needed
    } else if (isTabletOrMobile) {
      return spareImg ? spareImg.replace('large', 'medium') : null; // Change the image URL as needed
    }
    return spareImg;
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute flex items-center justify-center">
          {img && (
            <img
              src={getImageSrc()}
              alt={img}
              className={cn(imgClassName, "object-cover object-center max-w-full max-h-full m-auto")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"
            } flex items-center justify-center`}
        >
          {spareImg && (
            <img
              src={getSpareImageSrc()}
              alt={spareImg}
              className="object-cover object-center max-w-full max-h-full m-auto"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div
            className={`font-sans text-lg lg:text-3xl whitespace-pre-wrap max-w-96 font-medium z-10`}
          >
            {title}
          </div>
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base whitespace-nowrap text-sm text-[#C1C2D3] z-10">
            {description}
          </div>

          {/* le globe */}
          {id === 2 && <GlobeDemo />}

          {/* Tech stack list div */}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-3 w-fit absolute -right-3 lg:-right-0">
              {/* tech stack lists */}
              <div className="flex flex-col gap-2 md:gap-2 lg:gap-4">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-80 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
              </div>
              <div className="flex flex-col gap-2 md:gap-2 lg:gap-4">
                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-80 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="mt-3 relative space-y-2">
              <div
                className={`absolute -bottom-5 right-0 ${copied ? "block" : "block"
                  }`}
              >
                <Lottie
                  loop={copied}
                  animationData={animationData}
                  play={copied}
                  style={{ width: 400, height: 200 }}
                />
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};