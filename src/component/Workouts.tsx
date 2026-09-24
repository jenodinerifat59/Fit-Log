import { WorkoutType } from "@/type/workoutType";
import Image from "next/image";
import HomeCard from "./cardComponent/HomeCard";

const Workouts = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await res.json();
  console.log(data);
  return (
    <div className="mt-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          THE LIBRARY
        </h2>
        <p className="mt-2 text-[#9CA3AF]">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((data: WorkoutType) => (
            <HomeCard key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Workouts;
