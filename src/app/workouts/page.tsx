import HomeCard from "@/component/cardComponent/HomeCard";
import type { WorkoutType } from "@/type/workoutType";

const fatchWorkoutData = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );
  const data = await res.json()
  return data ;
}
const WorkoutsPage = async () => {
  
  // if (!res.ok) {
  //   return <p className="text-white">Failed to load workouts.</p>;
  // }

  const data: WorkoutType[] = await fatchWorkoutData();

  return (
    <section className="container mx-auto px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Workouts
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((workout) => (
          <HomeCard key={workout.id} data={workout} />
        ))}
      </div>
    </section>
  );
};

export default WorkoutsPage;