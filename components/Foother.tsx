import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./ui/MagicButton";
import { IoFlash } from "react-icons/io5";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          layout="fill" // Make the image fill its container
          objectFit="cover" // Cover the container
          className="opacity-50"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Discutons de la manière dont nous pouvons <span className="text-purple">Collaborer</span>
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center flex items-center justify-center">
          D&apos;abord, un café pour bien commencer, ensuite, prenons contact
          <IoFlash className="ml-2 my-5 text-center flex items-center justify-center" />
        </p>
        <a href="mailto:e.arteinsana@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>

        <div className="flex mt-8 md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 mb-10"
            >
              <Image
                src={info.img}
                alt="icons" // Use a more descriptive alt attribute
                width={20} // Use actual dimensions or adjust as needed
                height={20}
                className="object-cover"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Build with Next.js © 2024 Eliana Yepez
        </p>
      </div>
    </footer>
  );
};

export default Footer;