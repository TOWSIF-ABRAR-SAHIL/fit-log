"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { workoutsData, Workout } from "@/data/workouts";
import { Clock, Flame, Star } from "lucide-react";

export default function Home() {
  const [workouts] = useState<Workout[]>(workoutsData);

  return (
    <main className="min-h-screen bg-[#090a0c] text-white py-8 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* ================= HERO BANNER ================= */}
        <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-lime-400 text-xs font-black tracking-widest uppercase">
              WORKOUT LIBRARY
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today’s plan, and watch the week’s work add up.
            </p>
            <div className="pt-2">
              <a
                href="#library"
                className="inline-block bg-lime-400 hover:bg-lime-300 text-black font-black text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
              >
                BROWSE WORKOUTS
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
            <Image
              src="/banner.png"
              alt="Gym Character"
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* ================= WORKOUT LIBRARY GRID ================= */}
        <div id="library" className="space-y-6">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">
              THE LIBRARY
            </h2>
            <p className="text-gray-400 text-xs mt-0.5">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="group bg-[#121418] border border-gray-800/80 rounded-xl overflow-hidden hover:border-gray-700 transition-all flex flex-col justify-between"
              >
                <div className="relative h-48 w-full bg-[#1c1e24] overflow-hidden">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {workout.muscleGroups?.map((m) => (
                      <span
                        key={m}
                        className="bg-lime-400 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded-xs"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-extrabold text-sm uppercase text-white group-hover:text-lime-400 transition-colors">
                      {workout.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {workout.equipment}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-gray-400 border-t border-gray-800/80 pt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-lime-400" /> {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-lime-400" /> {workout.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1 ml-auto">
                      <Star className="w-3.5 h-3.5 text-lime-400 fill-lime-400" /> {workout.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}