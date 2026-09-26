"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFit } from "@/context/FitContext";
import { Clock, Flame, Star, Check, X, ArrowUpDown } from "lucide-react";
import toast from "react-hot-toast";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved } = useFit();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  // Double toast notification issue fix
  const toggleComplete = (workoutName: string, id: number) => {
    const isDone = completedIds.includes(id);

    if (!isDone) {
      toast.success(`Completed ${workoutName}! 💪`);
      setCompletedIds((prev) => [...prev, id]);
    } else {
      toast("Marked as incomplete", { icon: "ℹ️" });
      setCompletedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleRemove = (id: number, name: string) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
      toast.error(`Removed ${name} from Today's Plan`);
    } else {
      removeFromSaved(id);
      toast.error(`Removed ${name} from Saved`);
    }
  };

  // Current active list
  const currentList = activeTab === "plan" ? plan : saved;

  // Dynamic calculations for stats box
  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalCalories = currentList.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);

  // Sorting logic
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return (b.duration || 0) - (a.duration || 0);
    if (sortBy === "calories") return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <main className="min-h-screen bg-[#090a0c] text-white py-8 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* ================= HEADER & STATS ================= */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white">
              MY PLAN
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          {/* Dynamic Stats Box */}
          <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 grid grid-cols-3 divide-x divide-gray-800/80 text-left">
            <div className="px-4 space-y-1">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Exercises
              </span>
              <p className="text-3xl font-black text-lime-400">
                {totalExercises}
              </p>
            </div>

            <div className="px-6 space-y-1">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Minutes
              </span>
              <p className="text-3xl font-black text-white">
                {totalMinutes}
              </p>
            </div>

            <div className="px-6 space-y-1">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Calories
              </span>
              <p className="text-3xl font-black text-white">
                {totalCalories}
              </p>
            </div>
          </div>
        </div>

        {/* ================= CONTROLS ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Tabs */}
          <div className="bg-[#121418] p-1 rounded-xl border border-gray-800/80 flex items-center gap-1 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                activeTab === "plan"
                  ? "bg-[#1c1f26] text-white border border-gray-700/80"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                activeTab === "saved"
                  ? "bg-[#1c1f26] text-white border border-gray-700/80"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-gray-400 self-end sm:self-auto">
            <span>Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
                className="bg-[#121418] border border-gray-800/80 text-white rounded-lg px-3 py-2 text-xs font-bold uppercase appearance-none pr-8 cursor-pointer focus:outline-none focus:border-lime-400"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ================= WORKOUT LIST ================= */}
        {sortedList.length === 0 ? (
          <div className="bg-[#121418] border border-dashed border-gray-800/80 rounded-2xl p-16 text-center space-y-4 flex flex-col items-center justify-center min-h-[280px]">
            <h3 className="text-xl font-black uppercase tracking-tight text-white">
              NOTHING HERE YET
            </h3>
            <p className="text-gray-400 text-xs max-w-sm">
              Browse the library and add a lift to get today moving.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-block bg-lime-400 hover:bg-lime-300 text-black font-black text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedList.map((workout) => {
              const isDone = completedIds.includes(workout.id);

              return (
                <div
                  key={workout.id}
                  className={`bg-[#121418] border border-gray-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                    activeTab === "plan" && isDone ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-[#1c1e24] shrink-0">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-black text-sm uppercase text-white tracking-wide">
                        {workout.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {workout.equipment}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-lime-400" /> {workout.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-lime-400" /> {workout.caloriesBurned} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-lime-400 fill-lime-400" /> {workout.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center w-full sm:w-auto justify-end pt-2 sm:pt-0">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="bg-[#1c1f26] hover:bg-gray-800 text-gray-300 font-bold text-xs px-4 py-2.5 rounded-full border border-gray-800 transition-colors"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() => toggleComplete(workout.name, workout.id)}
                        className={`flex items-center gap-1.5 font-bold text-xs px-4 py-2.5 rounded-full transition-all ${
                          isDone
                            ? "bg-gray-800 text-lime-400 border border-lime-400/40"
                            : "bg-lime-400 hover:bg-lime-300 text-black"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        {isDone ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() => handleRemove(workout.id, workout.name)}
                      className="text-gray-500 hover:text-white p-2 rounded-lg transition-colors ml-1"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}