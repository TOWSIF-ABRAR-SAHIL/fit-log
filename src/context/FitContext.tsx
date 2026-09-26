"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

interface FitContextType {
  planList: Workout[];
  savedList: Workout[];
  completedIds: number[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
}

const FitContext = createContext<FitContextType | undefined>(undefined);

export const FitProvider = ({ children }: { children: React.ReactNode }) => {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => {
    const localPlan = localStorage.getItem("fit_plan");
    const localSaved = localStorage.getItem("fit_saved");
    const localDone = localStorage.getItem("fit_done");

    if (localPlan) setPlanList(JSON.parse(localPlan));
    if (localSaved) setSavedList(JSON.parse(localSaved));
    if (localDone) setCompletedIds(JSON.parse(localDone));
  }, []);

  useEffect(() => {
    localStorage.setItem("fit_plan", JSON.stringify(planList));
  }, [planList]);

  useEffect(() => {
    localStorage.setItem("fit_saved", JSON.stringify(savedList));
  }, [savedList]);

  useEffect(() => {
    localStorage.setItem("fit_done", JSON.stringify(completedIds));
  }, [completedIds]);

  const addToPlan = (workout: Workout) => {
    if (planList.length >= 5) {
      toast.error("Cap of 5 lifts reached for today!");
      return;
    }
    if (planList.some((item) => item.id === workout.id)) {
      toast.error("Already added to today's plan!");
      return;
    }
    setPlanList([...planList, workout]);
    toast.success("Added to today's plan!");
  };

  const addToSaved = (workout: Workout) => {
    if (savedList.some((item) => item.id === workout.id)) {
      toast.error("Already saved for later!");
      return;
    }
    setSavedList([...savedList, workout]);
    toast.success("Saved for later!");
  };

  const removeFromPlan = (id: number) => {
    setPlanList(planList.filter((item) => item.id !== id));
    toast.success("Removed from plan!");
  };

  const removeFromSaved = (id: number) => {
    setSavedList(savedList.filter((item) => item.id !== id));
    toast.success("Removed from saved list!");
  };

  const markAsDone = (id: number) => {
    if (!completedIds.includes(id)) {
      setCompletedIds([...completedIds, id]);
      toast.success("Marked as done!");
    }
  };

  return (
    <FitContext.Provider
      value={{
        planList,
        savedList,
        completedIds,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </FitContext.Provider>
  );
};

export const useFit = () => {
  const context = useContext(FitContext);
  if (!context) {
    throw new Error("useFit must be used within a FitProvider");
  }
  return context;
};