"use client";

import React, { useContext } from "react";
import type { WorkoutType } from "@/type/workoutType";
import { DataContext } from "../DataContext";
import { CalendarPlus2 } from "lucide-react";
import { toast } from "react-toastify";

const SaveLater = ({ workout }: { workout: WorkoutType }) => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContextProvider is missing");
  }

  const { workoutPlan, setWorkoutPlan } = context;

  const handleClick = () => {
    const alreadyAdded = workoutPlan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      toast.info("Workout is already in today's plan!");
      return;
    }

    setWorkoutPlan((prev) => [...prev, workout]);

    toast.success(`${workout.name} added to today's plan!`);
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-md border border-[#CCFF00] bg-[#CCFF00] px-5 py-3 text-sm text-black transition hover:bg-[#b7e600]"
    >
      <CalendarPlus2 className="mr-2 inline" size={18} />
      Add to today's plan
    </button>
  );
};

export default SaveLater;