import Navbar from "../Components/fragments/admin/Navbar";
// import SideDrawer from "../Components/fragments/admin/Drawer";
import Sidebar from "../Components/fragments/admin/Sidebar";

const Admin = () => {
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
