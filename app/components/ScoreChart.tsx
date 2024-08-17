"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { getScores } from "@/lib/apiHandlers";
import { giveChartData } from "../utils/gameUtils";
interface scoreItem {
  id?: number;
  score: number;
  frequency: number;
}

const ScoreChart = ({ score }: { score: number }) => {
  const [data, setData] = useState<scoreItem[] | null>(null);
  const [chartMax, setChartMax] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const scores = await getScores();
      const chartData = giveChartData(scores);
      if (chartData) {
        setData(chartData.processedScores);
        setChartMax(chartData.chartMax);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading || !chartMax) {
    return <div>Loading...</div>;
  }

  if (score > chartMax && data) {
    setData(() => [...data, { score: score, frequency: 0 }]);
    setChartMax(score);
  }

  const intervalSize = Math.round(chartMax / 6 / 10) * 10 - 1;

  return (
    <ResponsiveContainer width="99%" height="99%">
      <LineChart
        data={data ? data : undefined}
        margin={{ right: 10, bottom: 10, left: 5 }}
      >
        <Line
          type="monotone"
          dataKey="frequency"
          dot={false}
          strokeWidth={3}
          stroke="#475569"
        />
        <XAxis
          dataKey="score"
          allowDecimals={false}
          interval={intervalSize}
          strokeWidth={4}
          stroke="#334155"
          label={{ value: "Score", position: "insideBottom", offset: -4 }}
        />

        <Tooltip />
        {score ? <ReferenceLine x={score} strokeWidth={4} stroke="#059669" /> : null}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ScoreChart;
