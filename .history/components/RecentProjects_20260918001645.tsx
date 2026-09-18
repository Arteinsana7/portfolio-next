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
            className="h-[32.5rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer
              title={item.title}
              href={item.link}
            >
              <div className="flex flex-col h-[28rem] w-full">
                {/* Bloc image, hauteur fixe, angles propres */}
                <div className="relative sm:w-96 w-[80vw] h-[15rem] overflow-hidden rounded-3xl mb-4">
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ backgroundColor: "#13162D" }}
                  >
                    <img
                      src="/bg.png"
                      alt="bgimg"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {item.video ? (
                    <video
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="z-10 absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.img}
                      alt="cover"
                      className="z-10 absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>

                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h1>

                <p
                  className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                  style={{
                    color: "#BEC1DD",
                    margin: "1vh 0",
                  }}
                >
                  {item.des}
                </p>

                <div className="flex items-center justify-between mt-auto mb-3">
                  <div className="flex items-center">
                    {item.iconLists.map((icon, index) => (
                      <div
                        key={index}
                        className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                        style={{
                          transform: `translateX(-${5 * index + 2}px)`,
                        }}
                      >
                        <img src={icon} alt="icon" className="p-2" />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center">
                    <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                      Site / GitHub
                    </p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </div>
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;