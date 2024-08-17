"use client";
import { useState, useEffect } from "react";
import {
  getRandomNumber,
  getImageFromKey,
  preloadImage,
} from "../utils/gameUtils";
import { useRouter } from "next/navigation";
import { handleSubmit } from "@/lib/apiHandlers";

// keys have a broader definition in this code; they refer to an index of a list. please just roll with it.

import { useRef } from "react";

const useGame = () => {
  const router = useRouter();

  interface ImageData {
    key: string;
    recognizeFrequency: number;
    occurrence: number;
  }

  const [currentImage, setCurrentImage] = useState<ImageData>();

  const initialKeysToBeGenerated = 8;

  const [keysToBeGenerated, setKeysToBeGenerated] = useState(
    initialKeysToBeGenerated
  );
  const [generatedKeys, setGeneratedKeys] = useState<number[]>([]);
  const [generatedKeysFlag, setGeneratedKeysFlag] = useState<boolean>(false);

  const [unseenImages, setUnseenImages] = useState<ImageData[]>([]);
  const [seenImages, setSeenImages] = useState<ImageData[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [currentImageIsSeen, setcurrentImageIsSeen] = useState<boolean>(false);

  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [endingScore, setEndingScore] = useState<number>(0);

  const [endscreen, setEndscreen] = useState<boolean>(false);

  const [resetTriggered, setResetTriggered] = useState<boolean>(false);

  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const generateUnseenKeys = async () => {
    setLoading(true);

    const tempList = [];
    for (let i = 0; i < keysToBeGenerated; i++) {
      let newKey = getRandomNumber();

      while (generatedKeys.includes(newKey)) {
        newKey = getRandomNumber();
      }

      const imageSrc = getImageFromKey(newKey);

      await preloadImage(imageSrc);

      tempList.push({ key: imageSrc, recognizeFrequency: 0, occurrence: 0 });
      setGeneratedKeys((prevList) => [...prevList, newKey]);
    }

    setUnseenImages(tempList);

    setKeysToBeGenerated(keysToBeGenerated * 2);

    setGeneratedKeysFlag(true);

    setLoading(false);
  };

  useEffect(() => {
    if (generatedKeysFlag) {
      setGeneratedKeysFlag(false);
      getUnseenImage();
    }
  }, [generatedKeysFlag]);

  useEffect(() => {
    generateUnseenKeys();
  }, []);

  const getUnseenImage = () => {
    if (unseenImages.length === 0) {
      generateUnseenKeys();
    } else {
      const unseenImage = unseenImages[0];
      setCurrentImage(unseenImage);
      setSeenImages((prevSeenImages) => [...prevSeenImages, unseenImage]);
      setUnseenImages((prevList) => prevList.slice(1));

      setcurrentImageIsSeen(false);
    }
  };

  const getSeenImage = () => {
    if (seenImages) {
      const randomSeenKey = Math.floor(Math.random() * (seenImages.length - 1));
      const seenImage = seenImages[randomSeenKey];

      setSeenImages((prevSeenImages) => {
        const tempSeenImages = [...prevSeenImages];
        const seenImage = tempSeenImages[randomSeenKey];
        tempSeenImages.splice(randomSeenKey, 1);
        tempSeenImages.push(seenImage);
        return tempSeenImages;
      });

      setCurrentImage(seenImage);
      setcurrentImageIsSeen(true);
    }
  };

  const nextImage = () => {
    if (Math.random() < 0.4 && seenImages.length > 2) {
      getSeenImage();
    } else {
      getUnseenImage();
    }
    addImageOccurrence();
  };

  const handleCorrect = () => {
    const newScore = score + 1;
    setScore(newScore);

    addImageRecognizeFrequency();
  };

  const handleIncorrect = () => {
    const newLives = lives - 1;
    setLives(newLives);
  };

  const handleEndscreen = (open: boolean) => {
    setEndscreen(open);
  };

  const handleGameEnd = () => {
    setEndingScore(score);
    handleEndscreen(true);
    handleSubmit(seenImages, score);
    router.refresh();
    resetAll();
  };

  const addImageOccurrence = () => {
    setSeenImages((prevSeenImages) =>
      prevSeenImages.map((image) =>
        image.key === currentImage?.key
          ? {
              ...image,
              occurrence: image.occurrence + 1,
            }
          : image
      )
    );
  };

  const addImageRecognizeFrequency = () => {
    setSeenImages((prevSeenImages) =>
      prevSeenImages.map((image) =>
        image.key === currentImage?.key
          ? {
              ...image,
              recognizeFrequency: image.recognizeFrequency + 1,
            }
          : image
      )
    );
  };

  const resetAll = () => {
    setCurrentImage(undefined);
    setKeysToBeGenerated(initialKeysToBeGenerated);
    setGeneratedKeys([]);
    setGeneratedKeysFlag(false);
    setUnseenImages([]);
    setSeenImages([]);
    setLoading(false);
    setcurrentImageIsSeen(false);
    setLives(3);
    setScore(0);

    setResetTriggered(true);
  };

  useEffect(() => {
    if (lives < 1) {
      handleGameEnd();
    }
  }, [lives]);

  useEffect(() => {
    if (resetTriggered) {
      generateUnseenKeys();
      setResetTriggered(false);
    }
  }, [resetTriggered]);

  return {
    currentImage: currentImage ? currentImage.key : null,
    currentImageIsSeen,
    getUnseenImage,
    getSeenImage,
    nextImage,
    handleCorrect,
    handleIncorrect,
    loading,
    lives,
    score,
    endingScore,
    endscreen,
    handleEndscreen,
  };
};

export default useGame;
