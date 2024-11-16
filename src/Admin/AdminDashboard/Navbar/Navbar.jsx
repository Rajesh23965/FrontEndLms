import React from "react";
import { IoMenu } from "react-icons/io5";
import { GiBookAura } from "react-icons/gi";

const Navbar = () => {
  return (
    <>
      {/* Navbar of Admin Page */}
      <div className="flex bg-[#0e1730] items-center gap-2   py-2 ml-0 text-lg md:text-xl lg:text-2xl">
        <div className="text-white">
          <IoMenu size={25} />
        </div>
        <div className="flex items-center gap-2 md:gap-4 text-[#30c2a1] uppercase font-bold">
          <GiBookAura size={32} className="md:w-10 md:h-10" />
          <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl">
            RDGJ Library
          </h3>
        </div>
      </div>
    </>
  );
};

export default Navbar;
