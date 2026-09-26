"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFit } from "@/context/FitContext";
import { Dumbbell } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFit();

  return (
    <header className="bg-[#090a0c] border-b border-gray-800/80 sticky top-0 z-50 px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Dumbbell className="w-5 h-5 text-lime-400 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          <span className="font-black text-lg tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 bg-[#121418] p-1 rounded-full border border-gray-800/80">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              pathname === "/"
                ? "bg-[#1c1f26] text-white border border-gray-700/60 shadow-sm"
                : "text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              pathname === "/my-plan"
                ? "bg-[#1c1f26] text-white border border-gray-700/60 shadow-sm"
                : "text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Status Badges (Exact Figma Design) */}
        <Link
          href="/my-plan"
          className="flex items-center gap-5 text-xs font-medium hover:opacity-90 transition-opacity"
        >
          {/* Plan Count */}
          <div className="flex items-center gap-2 text-gray-300">
            <span>Plan</span>
            <span className="bg-[#a3e635] text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {plan.length}
            </span>
          </div>

          {/* Saved Count */}
          <div className="flex items-center gap-2 text-gray-400">
            <span>Saved</span>
            <span className="border border-gray-700 text-gray-300 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {saved.length}
            </span>
          </div>
        </Link>

      </div>
    </header>
  );
}