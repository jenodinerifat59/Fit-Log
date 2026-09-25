"use client";

import React, { useContext } from "react";
import type { WorkoutType } from "@/type/workoutType";
import { DataContext } from "@/context/DataContext";
import { Bookmark } from "lucide-react";
import { toast } from "react-toastify";

const SaveLater = ({ workout }: { workout: WorkoutType }) => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContextProvider is missing");
  }

  const { saveLater, setSaveLater } = context;

  const handleClick = () => {
    const alreadyAdded = saveLater.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      toast.info("Workout is already saved!");
      return;
    }

    setSaveLater((prev) => [...prev, workout]);

    toast.success(`${workout.name} saved for later!`);
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-md border border-gray-700 px-5 py-3 text-sm text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
    >
      <Bookmark className="mr-2 inline" size={18} />
      Save for later
    </button>
  );
};

export default SaveLater;