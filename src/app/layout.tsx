import type { Metadata } from "next";
import "./globals.css";
import { FitProvider } from "@/context/FitContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train hard, log honest.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#121417] text-white min-h-screen flex flex-col">
        <FitProvider>
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-1">{children}</main>
        </FitProvider>
      </body>
    </html>
  );
}