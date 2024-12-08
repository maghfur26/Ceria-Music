import Navbar from "../Components/fragments/admin/Navbar";
import Sidebar from "../Components/fragments/admin/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomPages from "./admin/room";

const Admin = ({children}) => {
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsCheckingToken(false);
    }
  }, [navigate]);

  if (isCheckingToken) {
    return null;
  }

  return (
    <div className="flex gap-4 bg-white h-screen w-full">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Admin;
