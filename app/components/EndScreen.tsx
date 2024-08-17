import * as React from "react";
import Modal from "@mui/material/Modal";
import Hearts from "./Hearts";
import ScoreChart from "./ScoreChart";

interface EndingModalProps {
  open: boolean;
  close: () => void;
  score: number;
}

const EndingModal: React.FC<EndingModalProps> = ({ open, close, score }) => {
  const findEnding = (score: number): string => {
    switch (true) {
      case score <= 6:
        return "Haha, very funny. Please try your hardest, so my chart looks cooler.";
      case score <= 12:
        return "Are you at least having fun?";
      case score <= 18:
        return "I don't really know what a good score is, but it probably isnt this one.";
      case score <= 25:
        return "Thanks for trying!";
      case score == 27:
        return "Secret Ending.";
      case score <= 32:
        return "Wow! Great job! Maybe try it again.";
      case score <= 48:
        return "You're really good at this.";
      case score <= 54:
        return "You're INCREDIBLY good at this! WOW!";
      case score == 59:
        return "That is my house number! If you score above 100, I will tell you my full address.";
      case score <= 64:
        return "You have the memory of an elephant.";
      case score <= 72:
        return "I know this girl that claims to be friends with everyone but all she does is send 20 reels a day and not reply to any texts.";
      case score <= 80:
        return "If I were you, I would be very proud of myself right now.";
      case score <= 100:
        return "Follow me on Instagram @zokdiny";
      case score <= 150:
        return "Photographic memory!";
      case score <= 200:
        return "I love beavers sm bruh.";
      case score > 200:
        return "Are you cheating?";
      default:
        return "How did you get a negative score????";
    }
  };

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center"
    >
      <div className="w-[90vw] h-[90vh] bg-white p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto auto] gap-4 w-full h-full">
          <div className="md:col-span-2 flex justify-center">
            <Hearts lives={0} />
          </div>
          <div className="flex flex-col items-center justify-around">
            <h1 className="text-3xl font-bold mb-4">You Lost :(</h1>
            <div>
              <h2 className="text-2xl">Your final score was {score}.</h2>
              <h2 className="text-2xl">{findEnding(score)}</h2>
            </div>
            <button
              onClick={close}
              className="border rounded-2xl p-4 px-8 text-xl bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Try Again
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <ScoreChart score={score} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EndingModal;
