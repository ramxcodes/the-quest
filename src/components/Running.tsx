"use client";

import React from "react";
import { motion } from "motion/react";
import { animate } from "motion";
import { RefreshCw } from "lucide-react";

interface RunningProps {
  achieved: number;
  goal: number;
  pace: number;
  duration: string;
}

export default function Running({
  achieved,
  pace,
  goal,
  duration,
}: RunningProps) {
  const progress = Math.min((achieved / goal) * 100, 100);

  const [animatedAchieved, setAnimatedAchieved] = React.useState(0);
  React.useEffect(() => {
    const controls = animate(0, achieved, {
      duration: 1,
      onUpdate(value) {
        setAnimatedAchieved(value);
      },
    });
    return controls.stop;
  }, [achieved]);

  return (
    <div className="mt-4 w-full rounded-lg border bg-card p-6">
      <div className="relative">
        <div
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="size-6 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-primary">
          🏃🏻‍♂️‍➡️ Running Stat
        </h3>
        <h4 className="text-base">
          Average Pace :
          <span className="font-bold text-primary"> {pace}/km </span>
        </h4>
        <h4 className="text-base">
          Duration :
          <span className="font-bold text-primary"> {duration} Minutes </span>
        </h4>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
             Achieved {animatedAchieved} km / {goal} Goal Km
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
