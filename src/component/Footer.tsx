import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#25272D] bg-[#0B0C10] mt-7">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">

        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={30}
            height={24}
            className="h-auto w-[50px] object-contain"
          />
           <p className="text-lg font-black text-white">
                FITLOG
              </p>
        </div>
        <p className="text-center text-[10px] text-[#696E78]">
          &copy; 2025 FitLog — Workout Library. Train hard, log forever.
        </p>
      </div>
    </footer>
  );
};

export default Footer;