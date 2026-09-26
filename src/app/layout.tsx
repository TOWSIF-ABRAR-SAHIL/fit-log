import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FitProvider } from "@/context/FitContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#090a0c] text-white min-h-screen flex flex-col`}>
        <FitProvider>
          {/* Top Navbar */}
          <Navbar />
          
          {/* Main Page Content */}
          <div className="flex-1">
            {children}
          </div>

          {/* Footer */}
          <Footer />

          {/* Global Toast Notification Setup (Top-Right Position) */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1c1f26",
                color: "#fff",
                border: "1px solid #374151",
                fontSize: "12px",
                fontWeight: "bold",
              },
              success: {
                iconTheme: {
                  primary: "#a3e635",
                  secondary: "#000",
                },
              },
            }}
          />
        </FitProvider>
      </body>
    </html>
  );
}