'use client'

import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";

const Navbar = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContextProvider is missing");
  }

  const { workoutPlan, saveLater } = context;

  const links = (
    <>
      <li className="rounded-md hover:bg-[#C2F800] hover:text-black">
        <Link href="/">Workouts</Link>
      </li>

      <li className="rounded-md hover:bg-[#C2F800] hover:text-black">
        <Link href="/my-plan">My Plan</Link>
      </li>
    </>
  );

  return (
    <div className="bg-[#0C0D10]">
      <div className="container mx-auto">
        <div className="navbar bg-[#0C0D10] shadow-sm">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost text-white lg:hidden"
              >
                ☰
              </div>

              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content z-10 mt-3 w-52 rounded-box bg-[#15171D] p-2 text-white shadow"
              >
                {links}
              </ul>
            </div>

            <Link href="/" className="flex items-center gap-2">
              <Image
                src={Logo}
                alt="FITLOG logo"
                width={35}
                height={35}
              />
              <p className="text-lg font-black text-white">
                FITLOG
              </p>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white">
              {links}
            </ul>
          </div>

          <div className="navbar-end gap-2">
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-white"
            >
              Plan
              <span className="rounded-full border border-gray-500 px-2 py-1 text-[#C2F800]">
                {workoutPlan.length}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-white"
            >
              Saved
              <span className="rounded-full border border-gray-500 px-2 py-1 text-[#C2F800]">
                {saveLater.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;