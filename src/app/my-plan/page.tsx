"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DataContext } from "@/context/DataContext";

type TabType = "today" | "saved";

const Page = () => {
  const context = useContext(DataContext);
  const [activeTab, setActiveTab] = useState<TabType>("today");

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

  const totalMinutes = activeWorkouts.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );
  const totalCalories = activeWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );
  const handleDone = (id: number) => {
    setWorkoutPlan((prev) =>
      prev.filter((workout) => workout.id !== id)
    );
  };

  const handleRemoveFromPlan = (id: number) => {
    setWorkoutPlan((prev) =>
      prev.filter((workout) => workout.id !== id)
    );
  };
  const handleRemoveSaved = (id: number) => {
    setSaveLater((prev) =>
      prev.filter((workout) => workout.id !== id)
    );
  };
  const handleAddToPlan = (id: number) => {
    const workout = saveLater.find((item) => item.id === id);

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
        <div>
          <h1 className="text-xl font-bold tracking-wide sm:text-2xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-xs text-gray-400 sm:text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
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
        <div className="mt-7 flex gap-5 border-b border-[#252832]">
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

        {/* Workout list */}
        <section className="mt-4 space-y-3">
          {activeWorkouts.length === 0 ? (
            <div className="rounded-xl border border-[#252832] bg-[#15171D] px-4 py-10 text-center text-sm text-gray-400">
              {activeTab === "today"
                ? "No workouts in today's plan."
                : "No saved workouts yet."}
            </div>
          ) : (
            activeWorkouts.map((workout) => {
              const isAlreadyAdded = workoutPlan.some(
                (item) => item.id === workout.id
              );

              return (
                <article
                  key={workout.id}
                  className="flex flex-col gap-3 rounded-xl border border-[#252832] bg-[#15171D] p-3 sm:flex-row sm:items-center sm:justify-between"
                >
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
                        <span>◷ {workout.duration} min</span>
                        <span>♨ {workout.caloriesBurned} kcal</span>
                        <span>★ {workout.rating}</span>
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
                          onClick={() => handleDone(workout.id)}
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
                          onClick={() => handleAddToPlan(workout.id)}
                          disabled={
                            isAlreadyAdded || workoutPlan.length >= 5
                          }
                          className="rounded-md bg-[#CCFF00] px-3 py-2 text-[9px] font-bold text-black transition hover:bg-[#b7e600] disabled:cursor-not-allowed disabled:opacity-40 sm:text-[10px]"
                        >
                          {isAlreadyAdded
                            ? "Already Added"
                            : "Add to Today’s Plan"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveSaved(workout.id)}
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