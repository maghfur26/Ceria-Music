import { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineAnalytics, MdOutlinePrivacyTip, MdSchedule } from "react-icons/md";
import { PiShoppingBagLight } from "react-icons/pi";
import { AiOutlineMail } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { IoNewspaperOutline, IoFolderOpenOutline } from "react-icons/io5";
import { FiFlag } from "react-icons/fi";
import { RiTeamLine } from "react-icons/ri";
import { LuHelpCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [activeIcon, setActiveIcon] = useState(null); // Track active icon
  const navigate = useNavigate()

  // Function to handle icon clicks
  const handleIconClick = (icon) => {
    setActiveIcon(icon); // Set the active icon
  };

  const menuItems = [
    { id: "message", label: "Message", icon: <AiOutlineMail /> },
    { id: "schedule", label: "Schedule", icon: <MdSchedule /> },
    { id: "analytics", label: "Analytics", icon: <MdOutlineAnalytics /> },
    { id: "news", label: "News", icon: <IoNewspaperOutline /> },
    { id: "recruitment", label: "Recruitment", icon: <PiShoppingBagLight /> },
    { id: "projects", label: "Projects", icon: <IoFolderOpenOutline /> },
    { id: "activity", label: "Activity", icon: <FiFlag /> },
    { id: "shared", label: "Shared", icon: <RiTeamLine /> },
    { id: "privacy", label: "Privacy", icon: <MdOutlinePrivacyTip /> },
    { id: "help", label: "Help!", icon: <LuHelpCircle /> },
  ];

  return (
    <aside
      className={`${
        isCollapse ? "py-[20px] px-[30px]" : "py-[15px] px-[10px]"
      } bg-[#F5F6F7] boxShadow rounded-md transition-all duration-300 ease overflow-y-auto max-h-[100vh]`}
    >
      {isCollapse ? (
        <div className="flex items-center">
          <ChevronLeftIcon onClick={() => setIsCollapse(!isCollapse)} />
          <p className="text-sm font-sans font-bold">MENU</p>
        </div>
      ) : (
        <div className="flex items-center">
          <p className="text-sm font-sans font-bold">MENU</p>
          <ChevronRightIcon onClick={() => setIsCollapse(!isCollapse)} />
        </div>
      )}

      <div className="mt-6">
        <p
          className={`${
            isCollapse ? "text-[1rem]" : "text-[0.9rem] text-center"
          } text-gray-500 font-[400]`}
        >
          General
        </p>

        <div className="mt-3 flex flex-col gap-[5px]">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group ${
                activeIcon === item.id ? "bg-white shadow-black drop-shadow-xl" : "hover:bg-gray-50"
              }`}
              onClick={() => handleIconClick(item.id)}
            >
              <div className="flex items-center gap-[8px]">
                <div
                  className={`text-[1.3rem] ${
                    activeIcon === item.id ? "text-blue-600" : "text-gray-800"
                  }`}
                >
                  {item.icon}
                </div>
                <p
                  className={`${
                    isCollapse ? "inline" : "hidden"
                  } text-[1.1rem] font-[400] text-gray-800`}
                >
                  {item.label}
                </p>
              </div>
            </div>
          ))}
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md mt-20">Logout</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
