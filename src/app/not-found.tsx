
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#15171D] text-center text-white">
      <h1 className="text-8xl font-bold text-[#C2F800]">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-400">
        Sorry, the page you are looking for
        does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#C2F800] px-6 py-3 font-semibold text-black"
      >
        Back to Home
      </Link>
    </div>
  );
}