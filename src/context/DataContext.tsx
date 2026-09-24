"use client";

import { WorkoutType } from "@/type/workoutType";
import React, {createContext,useState,type Dispatch,type SetStateAction,type ReactNode,} from "react";

type DataContextType = {
  workoutPlan: WorkoutType[];
  setWorkoutPlan: Dispatch<SetStateAction<WorkoutType[]>>;
  saveLater: WorkoutType[];
  setSaveLater: Dispatch<SetStateAction<WorkoutType[]>>;
};

export const DataContext = createContext<DataContextType | null>(null);

type ProviderProps = {children: ReactNode;};

const DataContextProvider = ({ children }: ProviderProps) => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutType[]>([]);
  const [saveLater, setSaveLater] = useState<WorkoutType[]>([]);

  const contextData: DataContextType = {
    workoutPlan,
    setWorkoutPlan,
    saveLater,
    setSaveLater,
};

  return (
    <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;