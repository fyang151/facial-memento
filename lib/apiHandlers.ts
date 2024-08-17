interface ImageData {
  key: string;
  recognizeFrequency: number;
  occurrence: number;
}

export const handleSubmit = async (seenImages: ImageData[], score: number) => {
  try {
    await Promise.all([
      fetch("/api/add-face", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seenImages }),
      }),
      fetch("/api/add-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(score),
      }),
    ]);
  } catch (error) {
    throw new Error(
      `Failed to submit data: ${error instanceof Error ? error.message : error}`
    );
  }
};

export const getScores = async () => {
  try {

    const res = await fetch("/api/get-score", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch scores: ${res.statusText}`);
    }

    const data = await res.json();

    const scores = data.scores;

    return scores;
  } catch (error) {
    throw new Error(
      `Error fetching scores: ${error instanceof Error ? error.message : error}`
    );
  }
};

export const getMemorableFaces = async () => {
  try {
    const res = await fetch("/api/get-memorable-faces", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch memorable faces: ${res.statusText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(
      `Error fetching memorable faces: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
};
