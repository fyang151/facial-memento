import React from "react";

interface HeartsProps {
  lives: number;
}

const Hearts: React.FC<HeartsProps> = ({ lives }) => {
  const HeartFilledIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-heart-filled h-[100%] w-10"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#2c3e50"
      fill="none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
        strokeWidth="0"
        fill="currentColor"
      />
    </svg>
  );

  const HeartIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-heart h-[100%] w-10"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#2c3e50"
      fill="none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
  );

  const hearts = Array.from({ length: 3 }, (_, index) => {
    if (index < lives) {
      return <div key={index}>{HeartFilledIcon}</div>;
    } else {
      return <div key={index}>{HeartIcon}</div>;
    }
  });

  return (
    <div className="col-span-3 flex flex-row text-emerald-500">{hearts}</div>
  );
};

export default Hearts;
