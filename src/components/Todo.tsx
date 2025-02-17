"use client";

import { Ban, Scan, Square, SquareCheck, X } from "lucide-react";
import React, { useState } from "react";

export type TodoStatus = "failed" | "completed" | "not-doing" | "TODO";

export interface TodoProps {
  title: string;
  status: TodoStatus;
}

export const Todo: React.FC<TodoProps> = ({ title, status }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleToggle = () => {
    setCurrentStatus((prev) => (prev === "completed" ? "TODO" : "completed"));
  };

  let icon;
  let textStyle = "text-lg text-gray-800";

  switch (currentStatus) {
    case "completed":
      icon = (
        <span className="text-green-500">
          <SquareCheck />
        </span>
      );
      textStyle = "text-gray-500 line-through";
      break;
    case "not-doing":
      icon = (
        <span className="text-yellow-500">
          <Ban />
        </span>
      );
      textStyle = "text-gray-500 italic";
      break;
    case "failed":
      icon = (
        <span className="text-red-500">
          <X />
        </span>
      );
      break;
    case "TODO":
      icon = (
        <span className="text-white">
          <Square />
        </span>
      );
      textStyle = "text-white";
      break;
    default:
      icon = (
        <span className="text-gray-400">
          <Scan />
        </span>
      );
      break;
  }

  return (
    <div
      className="my-2 flex items-center space-x-3 rounded-lg border p-3 shadow-sm"
      onClick={handleToggle}
    >
      <div className="size-6 shrink-0 hover:cursor-pointer">{icon}</div>
      <p className={textStyle}>{title}</p>
    </div>
  );
};
