"use client";
import useGame from "../hooks/useGame";
import FetchingFacesLoadingModal from "./FetchingFacesLoadingModal";
import EndingModal from "./EndScreen";
import Hearts from "./Hearts";
import ScoreChart from "./ScoreChart";

import { padNum } from "../utils/gameUtils";

import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: "400",
});

const GameContainer = () => {
  const {
    currentImage,
    currentImageIsSeen,
    nextImage,
    handleCorrect,
    handleIncorrect,
    loading,
    lives,
    score,
    endingScore,
    endscreen,
    handleEndscreen,
  } = useGame();

  const handleClickNew = () => {
    if (currentImageIsSeen) {
      handleIncorrect();
    } else {
      handleCorrect();
    }
    nextImage();
  };

  const handleClickSeen = () => {
    if (currentImageIsSeen) {
      handleCorrect();
    } else {
      handleIncorrect();
    }
    nextImage();
  };

  return (
    <>
      <EndingModal
        open={endscreen}
        close={() => {
          handleEndscreen(false);
        }}
        score={endingScore}
      />
      <FetchingFacesLoadingModal open={loading && !endscreen} />
      <div className={`${fredoka.className} flex justify-center select-none`}>
        <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 max-w-[85vw] max-h-[85vh] gap-4">
          <div className="w-full h-full overflow-hidden aspect-square">
            {currentImage ? (
              <img
                src={currentImage}
                className="object-contain w-full h-full"
                alt="Game Image"
              />
            ) : (
              <img
                src='/assets/cartoonface1.png'
                className="object-contain w-full h-full"
                alt="Game Loading Image"
              />
            )}
          </div>
          <div className="grid grid-rows-[4fr 1fr 1fr]">
            <ScoreChart score={score} />
            <div className="flex flex-row justify-between items-center">
              <div className="text-emerald-500 text-[200%]">
                {padNum(score)}
              </div>
              <Hearts lives={lives} />
            </div>
            <div className="flex flex-row justify-center gap-5">
              <button
                className="flex justify-center items-center border rounded-2xl p-[0.5vh] w-full text-[200%] bg-emerald-500 text-white hover:bg-emerald-600"
                onClick={handleClickNew}
              >
                new
              </button>
              <button
                className="flex justify-center items-center border rounded-2xl p-[0.5vh] w-full text-[200%] bg-emerald-500 text-white hover:bg-emerald-600"
                onClick={handleClickSeen}
              >
                seen
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameContainer;
