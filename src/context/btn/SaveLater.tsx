"use client";

import React, { useContext } from "react";
import type { WorkoutType } from "@/type/workoutType";
import { DataContext } from "../DataContext";
import { Bookmark } from "lucide-react";

const SaveLater = ({ workout }: { workout: WorkoutType }) => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContextProvider is missing");
  }

  const { saveLater, setSaveLater } = context;

  const handleClick = () => {
    const alreadyAdded = saveLater.find(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      console.log("Already saved!");
      return;
    }

    setSaveLater((prev) => [...prev, workout]);
    console.log("Added to save later");
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-md border border-gray-700 px-5 py-3 text-sm text-white"
    ><Bookmark className="inline mr-2" />
      Save for later
    </button>
  );
};

export default SaveLater;