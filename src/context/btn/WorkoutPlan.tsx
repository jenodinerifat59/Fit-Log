"use client";

import React, { useContext } from "react";
import type { WorkoutType } from "@/type/workoutType";
import { DataContext } from "../DataContext";
import { CalendarPlus2 } from "lucide-react";

const SaveLater = ({ workout }: { workout: WorkoutType }) => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContextProvider is missing");
  }

  const { workoutPlan, setWorkoutPlan } = context;

  const handleClick = () => {
    const alreadyAdded = workoutPlan.find(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      console.log("Already saved!");
      return;
    }

    setWorkoutPlan((prev) => [...prev, workout]);
    console.log("Added to save later");
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-md bg-[#CCFF00] border border-[#CCFF00]-700 px-5 py-3 text-sm text-black"
    > <CalendarPlus2 className="inline mr-2" />
      Add to today's plan
    </button>
  );
};

export default SaveLater;