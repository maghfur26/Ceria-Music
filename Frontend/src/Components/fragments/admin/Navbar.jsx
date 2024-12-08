import React, { useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { TbBrandGithubFilled } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <nav className=" py-4 px-4 flex items-center justify-between w-full relative">
      <img
        src="/src/assets/logo.png"
        alt="logo"
        className="w-[100px] object-contain"
      />
      <div className="flex items-center gap-[10px]">
        <FaDiscord className="text-[1.6rem] text-[#424242]c cursor-pointer hover:text-[#3B9DF8] transition-all duration-500 " />
        <TbBrandGithubFilled className="text-[1.6rem] text-[#424242]c cursor-pointer hover:text-[#3B9DF8] transition-all duration-500" />

        <CiMenuFries
          className="text-[1.6rem] text-[#424242]c cursor-pointer lg:hidden flex"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
      </div>

      <aside
        className={` ${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "translate-x-[200px] opacity-0 z-[-1]"
        } lg:hidden bg-[#3B9DF8] p-4 text-center absolute top-[60px] right-0 w-full sm:w-[300px] rounded-md transition-all duration-300`}
      >
        <div className="w-full relative mb-5">
          <input
            className="py-1.5 pr-4 pl-12 w-full rounded-full outline-none focus:border-[#3B9DF8]"
            placeholder="Search..."
          />
          <IoIosSearch className="absolute top-[9px] left-5 text-[#424242] text-[1.3rem]" />
        </div>
        <ul className="items-center gap-[20px] text-[1rem] text-white flex flex-col">
          <li className="hover:border-b-[#3B9DF8] border-b-[2px] border-transparent transition-all duration-500 cursor-pointer capitalize">
            home
          </li>
          <li className="hover:border-b-[#3B9DF8] border-b-[2px] border-transparent transition-all duration-500 cursor-poin ter capitalize">
            about us
          </li>
          <li className="hover:border-b-[#3B9DF8] border-b-[2px] border-transparent transition-all duration-500 cursor-pointer capitalize">
            services
          </li>
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
