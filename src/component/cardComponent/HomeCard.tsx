import { WorkoutType } from "@/type/workoutType";
import Image from "next/image";

const HomeCard = ({ data }: { data: WorkoutType }) => {
  return (
    <div
      className=" rounded-xl bg-[#15171D] p-4  transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(194,248,0,0.12)]">
      <Image src={data.image}alt={data.name} width={100} height={100} className="h-56 w-full rounded-lg object-cover transition-transform duration-500 hover:scale-105"/>
      <div className="mt-4 flex gap-2">
        {data.muscleGroups.map((muscle) => (
          <p key={muscle}className="rounded-full bg-[#C2F800] px-3 py-1 text-sm text-black"
          >{muscle}</p>))}
      </div>
      <h2 className="mt-3 text-xl font-bold text-white">
        {data.name}
      </h2>
      <p className="mt-1 text-gray-500">
        {data.equipment}
      </p>
      <hr className="my-4 border-gray-700" />
      <div className="flex justify-between text-sm text-gray-500">
        <span>{data.duration} min</span>
        <span>{data.caloriesBurned} kcal</span>
        <span>⭐ {data.rating}</span>
      </div>
    </div>
  );
};
export default HomeCard;