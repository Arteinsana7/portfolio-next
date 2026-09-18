'use client'
import dynamic from "next/dynamic";
import { FaLocationArrow } from "react-icons/fa6";

import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const HoloBackground = dynamic(
  () => import("@/components/holoBackgound"),
  { ssr: false }
);

const Hero = () => {
  return (
    <div className="pb-20 pt-36 overflow-hidden relative min-h-screen">
      <HoloBackground />
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black-100 z-[02] pointer-events-none" />
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black-100 z-[03] pointer-events-none" /> */}




      {/* <div
        className="h-screen w-full dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
  absolute top-0 left-0  flex items-center justify-center"
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center
   [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div> */}

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] lg:min-h-[50vh] flex flex-col items-center justify-center">
          {/* <p className="tracking-widest text-s text-center text-blue-100 max-w-100"> */}
          {/* Bonjour, je m&apos;appelle Eliana, */}


          <TextGenerateEffect
            words={"Bonjour, je suis Eliana,\nDesigneuse Digitale\n& Développeuse créative"}
            mobileWords={"Bonjour,\nje suis Eliana,\nDesigneuse\nDigitale\n& Développeuse\ncréative"}
            className="text-center text-[40px] md:text-5xl lg:text-6xl mt-16 md:mt-0"
          />

          {/* 
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            À la Recherche  de Nouveaux Défis.
          </p> */}

          <a href="#about">

          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;