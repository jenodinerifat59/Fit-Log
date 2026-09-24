import Image from "next/image";
import type { WorkoutType } from "@/type/workoutType";

const getWorkout = async (workoutId: string): Promise<WorkoutType | null> => {
  const res = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${workoutId}`,
  );

  if (!res.ok) {
    return null;
  }

  const workout: WorkoutType = await res.json();

  return workout;
};

const Page = async ({ params }: { params: Promise<{ workoutId: string }> }) => {
  const { workoutId } = await params;
  const workout = await getWorkout(workoutId);
  if (!workout) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Workout Not Found</h1>
          <p className="mt-3 text-gray-500">
            No workout found for ID: {workoutId}
          </p>
        </div>
      </div>
    );
  }
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <Image
            src={workout.image}
            alt={workout.name}
            width={800}
            height={600}
            className="h-full max-h-[600px] w-full rounded-xl object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold uppercase text-white">
            {workout.name}
          </h1>
          <p className="mt-3 text-gray-500">{workout.description}</p>
          <div className="mt-5 flex gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#C2F800] px-3 py-1 text-sm text-black">
                {muscle}
              </span>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-[#15171D] px-5">
            <div className="flex items-center justify-between border-b border-gray-700 py-4">
              <p className="text-xs text-gray-500">EQUIPMENT</p>
              <p className="text-sm text-white">{workout.equipment || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between border-b border-gray-700 py-4">
              <p className="text-xs text-gray-500">DIFFICULTY</p>
              <p className="text-sm text-white">
                {workout.difficulty || "N/A"}
              </p>
            </div>
            <div className="flex items-center justify-between border-b border-gray-700 py-4">
              <p className="text-xs text-gray-500">SETS</p>
              <p className="text-sm text-white">{workout.sets || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between border-b border-gray-700 py-4">
              <p className="text-xs text-gray-500">REPS</p>
              <p className="text-sm text-white">{workout.reps || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between border-b border-gray-700 py-4">
              <p className="text-xs text-gray-500">DURATION</p>
              <p className="text-sm text-white">
                {workout.duration ? `${workout.duration} min` : "N/A"}
              </p>
            </div>
            <div className="flex items-center justify-between py-4">
              <p className="text-xs text-gray-500">CALORIES</p>
              <p className="text-sm text-white">
                {workout.caloriesBurned
                  ? `${workout.caloriesBurned} kcal`
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white">INSTRUCTIONS</h2>
            <ol className="mt-4 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li key={index} className="text-sm text-gray-400">
                  {index + 1}. {instruction}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-8 flex gap-3">
            <button className="rounded-md bg-[#C2F800] px-5 py-3 text-sm font-semibold text-black">
              Add to workout plan
            </button>
            <button className="rounded-md border border-gray-700 px-5 py-3 text-sm text-white">
              Save for later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
