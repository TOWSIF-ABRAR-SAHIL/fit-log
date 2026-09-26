"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFit } from "@/context/FitContext";
import { Dumbbell, BookmarkCheck, Calendar, Home } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { planList, savedList } = useFit();

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Workouts", href: "/workouts", icon: Dumbbell },
    {
      name: "Today's Plan",
      href: "/plan",
      icon: Calendar,
      badge: planList.length,
    },
    {
      name: "Saved Lifts",
      href: "/saved",
      icon: BookmarkCheck,
      badge: savedList.length,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#181B20]/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain rounded-lg transition-transform group-hover:scale-105"
            />
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
              Fit<span className="text-amber-400">Log</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-amber-400/10 text-amber-400 font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{link.name}</span>

                  {/* Badge Count */}
                  {typeof link.badge === "number" && link.badge > 0 && (
                    <span className="ml-1 bg-amber-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}