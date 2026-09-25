import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import Link from "next/link";

const Navbar = () => {
  const links = (
    <>
      <li>
        <Link href="/">Workouts</Link>
      </li>

      <li>
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
                className="btn btn-ghost lg:hidden text-white"
              >
                ☰
              </div>

              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >{links}</ul>
            </div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={Logo} alt="FITLOG logo" width={35} height={35}/>
 <p className="text-lg font-black text-white"> FITLOG</p>
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
              className="text-white flex items-center gap-2"
            >Plan <span className="border border-gray-500 rounded-full px-2 py-1 text-[#C2F800]">0</span>
            </Link>
            <Link
              href="/my-plan"
              className="text-white flex items-center gap-2"> Saved
              <span className="border border-gray-500 rounded-full px-2 py-1">0</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;