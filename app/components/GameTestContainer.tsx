"use client";
import useGame from "../hooks/useGame";
import FetchingFacesLoadingModal from "./FetchingFacesLoadingModal";
import EndingModal from "./EndScreen";
import Hearts from "./Hearts";

import ScoreChart from "./ScoreChart";

const GameTestContainer = () => {
  const {
    currentImage,
    currentImageIsSeen,
    getUnseenImage,
    getSeenImage,
    nextImage,
    handleCorrect,
    handleIncorrect,
    loading,
    lives,
    score,
    endscreen,
    handleEndscreen,
  } = useGame();

  // const handleClickNew = () => {
  //   getUnseenImage();
  // };

  // const handleClickSeen = () => {
  //   getSeenImage();
  // };

  // const handleClickNext = () => {
  //   nextImage();
  // };

  // const handleClickCorrect = () => {
  //   handleCorrect();
  // };

  // const handleClickIncorrect = () => {
  //   handleIncorrect();
  // };

  // const handleClickEndscreen = () => {
  //   handleEndscreen(true);
  // };

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
    <div>
      <EndingModal
        open={endscreen}
        close={() => {
          handleEndscreen(false);
        }}
        score={score}
      />
      <FetchingFacesLoadingModal open={loading && !endscreen} />
      <div className="h-40">
        <ScoreChart score={score}/>
      </div>

      <h1>welcome to testing</h1>
      <div>loading: {loading.toString()}</div>
      <Hearts lives={lives} />
      <div>The current image is: {currentImageIsSeen ? "seen" : "new"}</div>
      <div>score: {score}</div>
      <div className="flex flex-row space-y-4 items-center">
        <button
          className="border p-4 hover:bg-emerald-500 hover:text-white inline-block"
          onClick={() => {
            getUnseenImage();
          }}
        >
          generate new image
        </button>
        <button
          className="border p-4 hover:bg-emerald-500 hover:text-white inline-block"
          onClick={() => {
            getSeenImage();
          }}
        >
          generate seen image
        </button>
        <button
          className="border p-4 hover:bg-emerald-500 hover:text-white inline-block"
          onClick={() => {
            nextImage();
          }}
        >
          cycle next gameloop
        </button>
        <button
          className="border p-4 hover:bg-emerald-500 hover:text-white inline-block"
          onClick={() => {
            handleCorrect();
          }}
        >
          right
        </button>
        <button
          className="border p-4 hover:bg-emerald-500 hover:text-white inline-block"
          onClick={() => {
            handleIncorrect();
          }}
        >
          wrong
        </button>
        <button
          className="border p-4 hover:bg-emerald-500 hover:text-white inline-block"
          onClick={() => {
            handleEndscreen(true);
          }}
        >
          open modal
        </button>
      </div>
      <div className="flex flex-row space-y-4 items-center">
        <button
          className="border p-4 hover:bg-emerald-500 hover:text-white inline-block"
          onClick={handleClickNew}
        >
          new
        </button>
        <button
          className="border p-4 hover:bg-emerald-500 hover:text-white inline-block"
          onClick={handleClickSeen}
        >
          seen
        </button>
      </div>
      
      <img className="h-40" src={currentImage ? currentImage : undefined}></img>
    </div>
  );
};

export default GameTestContainer;
