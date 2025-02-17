"use client";

import React from "react";
import { motion } from "motion/react";
import { animate } from "motion";
import { RefreshCw } from "lucide-react";

interface SleepProps {
  sleptFor: number;
  score: number;
  from: string;
  to: string;
}

export default function Sleep({ sleptFor, score, from, to }: SleepProps) {
  const progress = Math.min((sleptFor / 8) * 100, 100);

  const [animatedSleptFor, setAnimatedSleptFor] = React.useState(0);
  React.useEffect(() => {
    const controls = animate(0, sleptFor, {
      duration: 1,
      onUpdate(value) {
        setAnimatedSleptFor(value);
      },
    });
    return controls.stop;
  }, [sleptFor]);

  return (
    <div className="relative mt-4 w-full rounded-lg border bg-card p-6">
      <div
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() => window.location.reload()}
      >
        <RefreshCw className="size-6 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-primary">
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1 }}
          whileInView={{ rotate: 360 }}
        >
          🌛
        </motion.span>{" "}
        Slept for
      </h3>
      <h4 className="text-base">
        Sleep score: <span className="font-bold text-primary"> {score} </span>
      </h4>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            From {from} - To {to}
          </span>
          <span>{animatedSleptFor} Hr / 8 Hr</span>
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
  );
}
