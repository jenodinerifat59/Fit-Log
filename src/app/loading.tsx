
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#15171D] text-white">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-[#C2F800]" />

      <p className="text-gray-300">
        Loading workouts...
      </p>
    </div>
  );
}