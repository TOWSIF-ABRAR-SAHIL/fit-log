"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Workout } from "@/data/workouts";

interface FitContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
}

const FitContext = createContext<FitContextType | undefined>(undefined);

export function FitProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const addToPlan = (workout: Workout) => {
    if (!plan.some((item) => item.id === workout.id)) {
      setPlan((prev) => [...prev, workout]);
    }
  };

  const addToSaved = (workout: Workout) => {
    if (!saved.some((item) => item.id === workout.id)) {
      setSaved((prev) => [...prev, workout]);
    }
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <FitContext.Provider
      value={{ plan, saved, addToPlan, addToSaved, removeFromPlan, removeFromSaved }}
    >
      {children}
    </FitContext.Provider>
  );
}

export function useFit() {
  const context = useContext(FitContext);
  if (!context) {
    throw new Error("useFit must be used within a FitProvider");
  }
  return context;
}