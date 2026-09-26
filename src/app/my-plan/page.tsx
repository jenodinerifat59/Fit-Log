
"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DataContext } from "@/context/DataContext";

type TabType = "today" | "saved";
type SortType = "rating" | "duration" | "calories";

const Page = () => {
  const context = useContext(DataContext);

  const [activeTab, setActiveTab] = useState<TabType>("today");
  const [sortBy, setSortBy] = useState<SortType>("rating");

  if (!context) {
    throw new Error("DataContextProvider is missing");
  }

  const {
    workoutPlan,
    setWorkoutPlan,
    saveLater,
    setSaveLater,
  } = context;

  const activeWorkouts =
    activeTab === "today" ? workoutPlan : saveLater;

  // Sort workouts
  const sortedWorkouts = [...activeWorkouts].sort((a, b) => {
    if (sortBy === "rating") {
      return Number(b.rating) - Number(a.rating);
    }

    if (sortBy === "duration") {
      return Number(b.duration) - Number(a.duration);
    }

    return (
      Number(b.caloriesBurned) -
      Number(a.caloriesBurned)
    );
  });

  // Total minutes
  const totalMinutes = activeWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  // Total calories
  const totalCalories = activeWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  // Mark workout as done
  const handleDone = (id: number) => {
    setWorkoutPlan((prev) =>
      prev.filter((workout) => workout.id !== id)
    );
  };

  // Remove from today's plan
  const handleRemoveFromPlan = (id: number) => {
    setWorkoutPlan((prev) =>
      prev.filter((workout) => workout.id !== id)
    );
  };

  // Remove from saved
  const handleRemoveSaved = (id: number) => {
    setSaveLater((prev) =>
      prev.filter((workout) => workout.id !== id)
    );
  };

  // Add saved workout to today's plan
  const handleAddToPlan = (id: number) => {
    const workout = saveLater.find(
      (item) => item.id === id
    );

    if (!workout) return;

    const alreadyAdded = workoutPlan.some(
      (item) => item.id === id
    );

    if (alreadyAdded || workoutPlan.length >= 5) return;

    setWorkoutPlan((prev) => [...prev, workout]);
  };

  return (
    <main className="min-h-screen bg-[#0D0F14] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold tracking-wide sm:text-2xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-xs text-gray-400 sm:text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
          <div className="rounded-lg border border-[#252832] bg-[#15171D] p-3 sm:rounded-xl sm:p-4">
            <p className="text-[9px] font-medium tracking-wider text-gray-400 sm:text-xs">
              EXERCISES
            </p>

            <h2 className="mt-2 text-xl font-bold text-[#CCFF00] sm:text-2xl">
              {activeWorkouts.length}
            </h2>
          </div>

          <div className="rounded-lg border border-[#252832] bg-[#15171D] p-3 sm:rounded-xl sm:p-4">
            <p className="text-[9px] font-medium tracking-wider text-gray-400 sm:text-xs">
              MINUTES
            </p>

            <h2 className="mt-2 text-xl font-bold sm:text-2xl">
              {totalMinutes}
            </h2>
          </div>

          <div className="rounded-lg border border-[#252832] bg-[#15171D] p-3 sm:rounded-xl sm:p-4">
            <p className="text-[9px] font-medium tracking-wider text-gray-400 sm:text-xs">
              CALORIES
            </p>

            <h2 className="mt-2 text-xl font-bold sm:text-2xl">
              {totalCalories}
            </h2>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="mt-7 flex items-center justify-between gap-2 border-b border-[#252832]">
          {/* Tabs */}
          <div className="flex gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`border-b-2 px-2 py-3 text-xs font-semibold transition sm:text-sm ${
                activeTab === "today"
                  ? "border-[#CCFF00] text-[#CCFF00]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Today’s Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`border-b-2 px-2 py-3 text-xs font-semibold transition sm:text-sm ${
                activeTab === "saved"
                  ? "border-[#CCFF00] text-[#CCFF00]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort dropdown */}
          <div className="flex shrink-0 items-center gap-2 pb-2">
            <label
              htmlFor="workout-sort"
              className="text-[10px] text-gray-400 sm:text-xs"
            >
              Sort:
            </label>

            <select
              id="workout-sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as SortType)
              }
              className="max-w-[120px] rounded-md border border-[#303441] bg-[#15171D] px-2 py-2 text-[10px] text-white outline-none transition focus:border-[#CCFF00] sm:max-w-none sm:px-3 sm:text-xs"
            >
              <option value="rating">Rating</option>
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
            </select>
          </div>
        </div>

        {/* Workout list */}
        <section className="mt-4 space-y-3">
          {sortedWorkouts.length === 0 ? (
            <div className="rounded-xl border border-[#252832] bg-[#15171D] px-4 py-10 text-center text-sm text-gray-400">
              {activeTab === "today"
                ? "No workouts in today's plan."
                : "No saved workouts yet."}
            </div>
          ) : (
            sortedWorkouts.map((workout) => {
              const isAlreadyAdded = workoutPlan.some(
                (item) => item.id === workout.id
              );

              return (
                <article
                  key={workout.id}
                  className="flex flex-col gap-3 rounded-xl border border-[#252832] bg-[#15171D] p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Workout info */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative h-12 w-[68px] shrink-0 overflow-hidden rounded-md sm:h-14 sm:w-[76px]">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="76px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-xs font-bold sm:text-sm">
                        {workout.name}
                      </h3>

                      <p className="mt-1 truncate text-[10px] text-gray-400 sm:text-xs">
                        {workout.equipment}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2 text-[9px] text-gray-300 sm:gap-3 sm:text-[11px]">
                        <span>
                          ◷ {workout.duration} min
                        </span>

                        <span>
                          ♨ {workout.caloriesBurned} kcal
                        </span>

                        <span>
                          ★ {workout.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="rounded-md border border-[#303441] px-3 py-2 text-[9px] text-gray-300 transition hover:bg-[#252832] hover:text-white sm:text-[10px]"
                    >
                      Show Details
                    </Link>

                    {activeTab === "today" ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            handleDone(workout.id)
                          }
                          className="rounded-md bg-[#CCFF00] px-3 py-2 text-[9px] font-bold text-black transition hover:bg-[#b7e600] sm:text-[10px]"
                        >
                          ✓ Mark as Done
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveFromPlan(workout.id)
                          }
                          aria-label={`Remove ${workout.name} from today's plan`}
                          title="Remove from plan"
                          className="rounded-md border border-[#303441] px-3 py-1.5 text-sm text-gray-400 transition hover:border-red-500 hover:text-red-400"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            handleAddToPlan(workout.id)
                          }
                          disabled={
                            isAlreadyAdded ||
                            workoutPlan.length >= 5
                          }
                          className="rounded-md bg-[#CCFF00] px-3 py-2 text-[9px] font-bold text-black transition hover:bg-[#b7e600] disabled:cursor-not-allowed disabled:opacity-40 sm:text-[10px]"
                        >
                          {isAlreadyAdded
                            ? "Already Added"
                            : "Add to Today’s Plan"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveSaved(workout.id)
                          }
                          aria-label={`Remove ${workout.name} from saved`}
                          title="Remove from saved"
                          className="rounded-md border border-[#303441] px-3 py-1.5 text-sm text-gray-400 transition hover:border-red-500 hover:text-red-400"
                        >
                          ×
                        </button>
                      </>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
};

export default Page;