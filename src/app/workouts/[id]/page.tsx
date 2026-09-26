"use client";

import { use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { workoutsData } from "@/data/workouts";
import { useFit } from "@/context/FitContext";
import { Bookmark, Plus, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { plan, saved, addToPlan, addToSaved } = useFit();

  const workout = workoutsData.find((w) => w.id === parseInt(id));

  if (!workout) {
    notFound();
  }

  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  // Plan Toggle Handler
  const handlePlanToggle = () => {
    if (isInPlan) {
      toast.error("Already in your plan");
      return;
    }

    if (plan.length >= 5) {
      toast.error("Cap of 5 lifts reached for today!");
      return;
    }

    addToPlan(workout);
    toast.success("Added to today's plan!");
  };

  // Saved Toggle Handler
  const handleSavedToggle = () => {
    if (isSaved) {
      toast.error("Already saved for later");
      return;
    }

    addToSaved(workout);
    toast.success("Saved for later!");
  };

  return (
    <main className="min-h-screen bg-[#090a0c] text-white py-10 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Image */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#14161b] border border-gray-800/80">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                {workout.name}
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                {workout.description ||
                  "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {workout.muscleGroups?.map((m) => (
                  <span
                    key={m}
                    className="bg-lime-400 text-black text-[11px] font-black uppercase px-2.5 py-0.5 rounded-xs tracking-wider"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-[#121418] border border-gray-800/80 rounded-xl divide-y divide-gray-800/60 text-xs">
              <div className="flex justify-between items-center p-3.5">
                <span className="text-gray-400 uppercase font-bold tracking-wider">EQUIPMENT</span>
                <span className="text-white font-medium">{workout.equipment}</span>
              </div>
              <div className="flex justify-between items-center p-3.5">
                <span className="text-gray-400 uppercase font-bold tracking-wider">DIFFICULTY</span>
                <span className="text-white font-medium">{workout.difficulty || "Intermediate"}</span>
              </div>
              <div className="flex justify-between items-center p-3.5">
                <span className="text-gray-400 uppercase font-bold tracking-wider">SETS</span>
                <span className="text-white font-medium">{workout.sets || "4"}</span>
              </div>
              <div className="flex justify-between items-center p-3.5">
                <span className="text-gray-400 uppercase font-bold tracking-wider">REPS</span>
                <span className="text-white font-medium">{workout.reps || "6-8"}</span>
              </div>
              <div className="flex justify-between items-center p-3.5">
                <span className="text-gray-400 uppercase font-bold tracking-wider">DURATION</span>
                <span className="text-white font-medium">{workout.duration} min</span>
              </div>
              <div className="flex justify-between items-center p-3.5">
                <span className="text-gray-400 uppercase font-bold tracking-wider">CALORIES</span>
                <span className="text-white font-medium">{workout.caloriesBurned} kcal</span>
              </div>
              <div className="flex justify-between items-center p-3.5">
                <span className="text-gray-400 uppercase font-bold tracking-wider">RATING</span>
                <span className="text-white font-medium">{workout.rating}</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-3 pt-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-white">
                INSTRUCTIONS
              </h2>
              <ol className="space-y-2 text-xs text-gray-300 list-decimal list-inside leading-relaxed">
                {workout.instructions && workout.instructions.length > 0 ? (
                  workout.instructions.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      {step}
                    </li>
                  ))
                ) : (
                  <>
                    <li>Lie on the bench with eyes under the bar and feet planted.</li>
                    <li>Unrack with locked elbows and lower the bar to mid-chest.</li>
                    <li>Press up in a slight arc until elbows lock without bouncing.</li>
                    <li>Keep shoulder blades pinched and a natural arch in the back.</li>
                  </>
                )}
              </ol>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button
                onClick={handlePlanToggle}
                className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all ${
                  isInPlan
                    ? "bg-gray-800 text-lime-400 border border-lime-400/50"
                    : "bg-lime-400 hover:bg-lime-300 text-black"
                }`}
              >
                {isInPlan ? (
                  <>
                    <Check className="w-4 h-4" /> Added to plan
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add to today's plan
                  </>
                )}
              </button>

              <button
                onClick={handleSavedToggle}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg border transition-all ${
                  isSaved
                    ? "border-lime-400 text-lime-400 bg-lime-400/10"
                    : "border-gray-800 hover:border-gray-700 text-gray-300 bg-[#121418]"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                {isSaved ? "Saved" : "Save for later"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}