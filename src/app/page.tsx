'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import BanerImg from "../../public/assets/banner.png";
import Workouts from "./../component/Workouts";

const Page = () => {
  return (
    <section>
      <div className="container mx-auto px-6 py-10 bg-[#15171D] rounded-[16px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div>
            <p className="text-[#C2F800] font-semibold tracking-widest mb-4">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="text-[#696E78] text-base md:text-lg leading-7 mt-6 max-w-xl">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today's plan, and watch the week's work add up.
            </p>

            <Link
              href="/my-plan"
              className="inline-block bg-[#C2F800] text-black font-bold px-6 py-3 mt-8 rounded-2xl hover:bg-[#d4ff3b] transition"
            >
              BROWSE WORKOUTS
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-125">
              <Image
                src={BanerImg}
                alt="Workout"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <Workouts />
    </section>
  );
};

export default Page;