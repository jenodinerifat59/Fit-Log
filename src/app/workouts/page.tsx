import HomeCard from "@/component/cardComponent/HomeCard";
import { WorkoutType } from "@/type/workoutType";

const WorkoutPage = async() => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await res.json();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((data: WorkoutType) => (
        <HomeCard key={data.id} data={data} />
      ))}
    </div>
  );
};

export default WorkoutPage;
