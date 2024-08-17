"use client"
import React, { useEffect, useState } from "react";
import { getMemorableFaces } from "@/lib/apiHandlers";
import { Fredoka } from "next/font/google";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: "400",
});

interface faceItem {
  id: number;
  faceKey: string;
  correctness: number;
  occurrence: number;
  memorability: number;
}

const giveBanner = (index: number) => {
  switch (index) {
    case 0:
      return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600";
    case 1:
      return "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500";
    case 2:
      return "bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-600";
    default:
      return "bg-emerald-600";
  }
};

const FacesList = () => {
  const [data, setData] = useState<faceItem[]>();
  const [shownData, setShownData] = useState<faceItem[]>();
  const [length, setLength] = useState<number>(10);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getMemorableFaces().then((item) => {
        const faces = item.memorableFaces;
        console.log(faces);
        setData(faces);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const slicedData = data.slice(0, length);
      setShownData(slicedData);
    }
  }, [data, length]);

  useEffect(() => {
    setShowButton(true);
  }, [shownData]);

  const ranking = (
    <div
      className={`${fredoka.className} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 select-none`}
    >
      {shownData?.map((item, index) => {
        return (
          <div key={index} className="relative">
            <div className="relative z-10 group">
              <span
                className={`${giveBanner(
                  index
                )} flex justify-center items-center absolute z-20 group-hover:opacity-0 group-active:opacity-0 transition-opacity duration-300 text-white text-[5vw] ml-5 px-[1vw]`}
              >
                {index + 1}
              </span>
              <img
                src={item.faceKey}
                alt={`image ${item.id}`}
                className="transition-opacity duration-300 group-hover:opacity-5 w-[45vw] md:w-[30vw] lg:w-[23vw]"
              />
            </div>
            <span className="flex flex-col justify-between absolute top-0 left-0 w-full h-full bg-emerald-500 text-white">
              <h1 className="text-[3vw] mt-2 ml-4 mr-2">
                Memorability Value:{" "}
                {Math.round(item.memorability * 100000) / 100000}
              </h1>
              <h2 className="text-[2vw] mb-4 ml-4 mr-2 w-[45vw] md:w-[30vw] lg:w-[23vw]">
                Of the {item.occurrence}{" "}
                {item.occurrence === 1 ? "time" : "times"} that this face has
                been seen, it was correctly remembered {item.correctness}{" "}
                {item.correctness === 1 ? "time" : "times"}.
              </h2>
            </span>
          </div>
        );
      })}
    </div>
  );

  const handleSeeMoreClick = () => {
    const addedLength = length + 10;
    setLength(addedLength);
  };

  return (
    <div className={`${fredoka.className} grid justify-items-center gap-4`}>
      <div className="text-xl sm:text-3xl text-white bg-emerald-500 p-4 border-emerald-500 rounded-lg">
        <InlineMath
          math={
            "\\text{Memorability Value} = \\frac{\\text{Correctness}}{\\sqrt{\\text{Occurrence}}}"
          }
        />
      </div>
      <div className="text-3xl w-[90vw]">
        <h2>
          From all the faces that have been played so far, I have collected the
          top 100 most recognizable ones. I anticipate that as more and more
          faces are added to the database, the faces here will become more and
          more gruesome. If every face in the top 10 look like ai generated
          horrors, I will know that I have succeeded.
        </h2>
      </div>
      {ranking}
      {showButton && (
        <button
          onClick={() => handleSeeMoreClick()}
          className="w-[20vw] flex justify-center border rounded-2xl p-2 text-[200%] bg-emerald-500 text-white hover:bg-emerald-600"
        >
          see more
        </button>
      )}
      <span className="h-4" />
    </div>
  );
};

export default FacesList;
