import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const listMenu = [
    {
      id: 1,
      title: "Dashboard",
      icon: "ri-dashboard-line",
      link: "/admin",
    },
    {
      id: 2,
      title: "Booking",
      icon: "ri-file-list-3-line",
      link: "/admin/booking",
    },
    {
      id: 3,
      title: "Room",
      icon: "ri-file-list-3-line",
      link: "/admin/room",
    },
    {
      id: 4,
      title: "Payment",
      icon: "ri-file-list-3-line",
      link: "/admin/payment",
    },
  ];

  return (
    <nav className="py-4 px-4 flex items-center justify-between w-full relative">
      <img src={logo} alt="logo" className="w-[100px] object-contain" />
      <div className="flex items-center gap-[10px]">
        <AccountCircleIcon
          className="text-[1.6rem] text-[#424242] cursor-pointer hover:text-[#3B9DF8] transition-all duration-500"
          onClick={handleAccountClick}
        />

        <CiMenuFries
          className="text-[1.6rem] text-[#424242] cursor-pointer lg:hidden flex"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
      </div>

      {showProfile && (
        <div
          ref={profileRef}
          className="absolute z-50 top-[60px] right-0 w-[300px] bg-white p-4 shadow-lg rounded-md"
        >
          <h2 className="text-xl font-bold">Profile Admin</h2>
          <p className="mt-2">Nama: John Doe</p>
          <p>Email: john.doe@example.com</p>
          <button
            className="mt-4 bg-[#f83b3b] text-white py-2 px-4 rounded hover:bg-[#da4040]"
            onClick={() => {
              setShowProfile(false);
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      )}

      <aside
        className={`${
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
          {listMenu.map((item) => (
            <li key={item.id} className="hover:border-b-[#3B9DF8] border-b-[2px] border-transparent transition-all duration-500 cursor-pointer capitalize">
              <a href={item.link} className="flex items-center gap-2">
                <span className="text-[1.2rem]">
                  <item.icon />
                </span>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
