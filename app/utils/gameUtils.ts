"use client";

export const getRandomNumber = () => {
  const num = Math.floor(Math.random() * (9999 - 1) + 1);
  return num;
};

export const padNum = (num: number) => {
  const paddedNum = String(num).padStart(6, "0");
  return paddedNum;
};

export const getImageFromKey = (key: number) => {
  const imageSrc = `https://ozgrozer.github.io/100k-faces/0/${Math.floor(
    key / 1000
  )}/${padNum(key)}.jpg`;

  return imageSrc;
};

export const preloadImage = (src: string) => {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => reject();
  });
};

interface scoreItem {
  id: number;
  score: number;
  frequency: number;
}

export const findMaxChart = (scores: scoreItem[]) => {
  const scoresMax = scores.reduce((prev, current) =>
    prev && prev.score > current.score ? prev : current
  ).score;
  const chartMax = scoresMax > 32 ? Math.ceil(scoresMax * 1.1) : 32;
  return chartMax;
};

export const giveChartData = (scores: scoreItem[] | null) => {
  if (scores) {
    const chartMax = findMaxChart(scores);

    const processedScores = [];

    for (let i = 0; i < chartMax; i++) {
      const existingScore = scores.find((item) => item.score === i);
      if (existingScore) {
        processedScores.push(existingScore);
      } else {
        processedScores.push({ score: i, frequency: 0 });
      }
    }

    return { processedScores: processedScores, chartMax: chartMax };
  } else {
    return null;
  }
};

