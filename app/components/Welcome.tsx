"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Fredoka } from "next/font/google";

import LoadingModal from "./LoadingModal";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: "400",
});

const Welcome = () => {
  const ScrollDownIndicator = () => (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );

  const GetRandomCartoonFace = () => {
    const num = Math.random();
    switch (true) {
      case num < 0.2:
        return "/assets/cartoonface3.png";
      case num < 0.4:
        return "/assets/cartoonface4.png";
      default:
        return "/assets/cartoonface1.png";
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    setImageSrc(GetRandomCartoonFace());
  }, []);

  return (
    <>
      <LoadingModal open={loading} />
      <div
        className={`${fredoka.className} flex flex-col items-center justify-center text-slate-700`}
      >
        <div className="h-[95vh] flex flex-col justify-center lg:justify-around items-center w-full bg-emerald-500 ">
          <div className="flex flex-col items-center ml-3 lg:ml-0">
            <h1 className="text-6xl sm:text-[10vw] 2xl:text-[20vh] text-white text-center">
              Facial Memento
            </h1>
            <h2 className="text-4xl sm:text-[4vw] 2xl:text-[4vh] text-white font-sans text-center">
              How well can you remember faces?
            </h2>
          </div>

          <Link
            href="/game"
            className="mt-16 text-4xl md:text-[4vw] lg:mt-0 2xl:text-[7vh] rounded-2xl p-4 lg:p-[2vw] bg-slate-50 hover:bg-slate-200 border-slate-50 hover:border-slate-200"
            onClick={() => setLoading(true)}
          >
            Enter
          </Link>
        </div>
        <div className="h-[5vh] flex items-center justify-center">
          <ScrollDownIndicator />
        </div>
        <div className="w-full grid grid-rows-[auto auto] md:grid-cols-3 px-5 mt-5">
          {imageSrc && (
            <img src={imageSrc} alt="mystery face" className="border" />
          )}
          <div className="md:col-span-2 flex flex-col items-center">
            <h1 className="text-[3vw]">Have You Seen This Face?</h1>
            <h2 className="text-3xl md:text-[2vw] p-4">
              When you start, the game will start throwing faces at you. They
              can only be (1) a face that you have seen before or (2) a
              completely new face. Your goal will be to determine which faces
              are which. The game will go on for as long as you can, granted you
              don’t correctly guess all the tens of thousands of faces I have
              access to. Everyone few faces or so, please wait a few seconds for
              the site to fetch some faces.
              <br />
              <br />
              You will get the hang of it. I believe in you.
            </h2>
          </div>
        </div>
        <h1 className="bg-slate-500 text-white p-4 mt-5 w-full">
          Visit the{" "}
          <Link
            href="/about"
            className="text-emerald-500 hover:text-emerald-700 w-full"
          >
            About
          </Link>{" "}
          Page for more information, or for data of the most memorable faces
          determined through this game visit the{" "}
          <Link
            href="/faceindex"
            className="text-emerald-500 hover:text-emerald-700 w-full"
          >
            Face Index.
          </Link>
        </h1>
      </div>
    </>
  );
};

export default Welcome;
