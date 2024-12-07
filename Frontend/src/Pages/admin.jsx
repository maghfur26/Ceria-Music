import Navbar from "../Components/fragments/admin/Navbar";
// import SideDrawer from "../Components/fragments/admin/Drawer";
import Sidebar from "../Components/fragments/admin/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
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
    <div className="flex gap-4 bg-[#F5F6F7] h-screen w-full">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar />
      </div>
    </div>
  );
};

export default Admin;
