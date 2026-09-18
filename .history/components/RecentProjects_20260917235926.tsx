"use client";

import { FaLocationArrow } from "react-icons/fa6";

import { projects } from "@/data";
import { PinContainer } from './ui/3d-pin'
const RecentProjects = () => {
  return (
    <div className="py-20 mt-5 " id="projects">
      <h1 className="heading">
        Mes{" "}
        <span className="text-purple">projets</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-10 gap-16 ">
        {projects.map((item) => (
          <div
            className=" h-[32.5rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer title={item.title} href={item.link}>
              <div className="flex flex-col h-[20rem] w-full">
                {/* bloc image, hauteur fixe déjà corrigée */}
                <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[15rem] mb-4">
                  {/* ... */}
                </div>

                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h1>

                <p
                  className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                  style={{ color: "#BEC1DD", margin: "1vh 0" }}
                >
                  {item.des}
                </p>

                <div className="flex items-center justify-between mt-auto mb-3">
                  {/* icônes + lien, poussés en bas avec mt-auto */}
                </div>
              </div>
            </PinContainer>          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;