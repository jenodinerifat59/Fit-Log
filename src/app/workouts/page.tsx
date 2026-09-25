import HomeCard from "@/component/cardComponent/HomeCard";
import type { WorkoutType } from "@/type/workoutType";

type Props = {
  params: Promise<{ workoutId: string }>;
};

const WorkoutDetailsPage = async ({ params }: Props) => {
  const { workoutId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${workoutId}`
  );

  if (!res.ok) {
    return <p>Workout not found.</p>;
  }

  const data: WorkoutType = await res.json();

  return (
    <div className="p-6">
      <HomeCard data={data} />
    </div>
  );
};

export default WorkoutDetailsPage;