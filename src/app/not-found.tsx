import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] bg-[#090a0c] text-white flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-8xl font-black text-lime-400">404</h1>
      <h2 className="text-2xl font-bold uppercase mt-4">Page Not Found</h2>
      <p className="text-gray-400 text-sm max-w-md mt-2">
        The lift or page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 bg-lime-400 hover:bg-lime-300 text-black font-black text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
}