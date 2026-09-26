import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#090a0c] border-t border-gray-800/80 py-8 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side: Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Dumbbell className="w-5 h-5 text-lime-400 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          <span className="font-black text-base tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Right Side: Copyright */}
        <p className="text-xs text-gray-500 font-medium text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}