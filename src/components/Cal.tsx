import React from "react";

interface CalProps {
  title: string;
  goal: number;
  achieved: number;
}

export default function Cal({ title, goal, achieved }: CalProps) {
  const progress = Math.min((achieved / goal) * 100, 100);

  return (
    <div className="mt-4 w-full rounded-lg border bg-card p-6">
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>
            {achieved} Kcal / {goal} Kcal
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
