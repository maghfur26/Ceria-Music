import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logo.png";
import Bg from "../../../assets/bgLandingPages.jpg";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";
import swal from 'sweetalert2';


const AdminProfile = () => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("https://ceria-music-production-4534.up.railway.app/api/user", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setUser(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleLogout = async () => {
    try {
      const result = await swal.fire({
        title: "Are you sure?",
        text: "You will be logged out of the system!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me out!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const token = await sessionStorage.getItem("token");
        if (token) {
          sessionStorage.removeItem("token");
        }
        navigate("/login");
        swal.fire(
          "Logged Out!",
          "You have been successfully logged out.",
          "success"
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
      swal.fire("Error!", "Something went wrong during logout.", "error");
    }
  };
  

  return (
    <>
      <div className="h-[80dvh] flex justify-center">
        <div className="flex items-center justify-center font-manrope">
          <div className="bg-[#222222] w-[1000px] h-[590px] lg:w-[1000px] tablets7portrait:w-[1200px] tablets7portrait:h-[1450px] ipadairportrait:w-[1200px] lg:h-[530px] zflip3portrait:h-[700px] iphone14plus:h-[670px] md:h-[1345px] relative rounded-none lg:rounded-2xl md:rounded-none">
            <div className="absolute -top-8 translate-x-[440px] lg:translate-x-[310px] hidden md:hidden lg:block">
              <div className="bg-white border border-slate-700 px-32 py-3 rounded-full">
                <h1 className="text-2xl">Admin Profile</h1>
              </div>
            </div>
            <div className="absolute flex lg:flex-row md:flex-col flex-col gap-x-8 left-9 right-10 md:mt-12 mt-5">
              <div className="">
                <img
                  src={Bg}
                  alt=""
                  className="md:w-[800px] lg:rounded-3xl lg:w-[430px] md:h-[540px] lg:h-[440px] w-[400px] h-[200px] ipadairportrait:rounded-none zflip3portrait:rounded-xl ipadProPortrait:translate-x-[96px] ipadairportrait:translate-x-[79px] tablets7portrait:translate-x-[78px] md:translate-x-[42px] lg:translate-x-0 rounded-none md:rounded-[30px]"
                />
              </div>
              <div className="bg-white md:w-[800px] lg:rounded-3xl lg:w-[630px] md:translate-x-[42px] ipadairportrait:translate-x-[79px] zflip3portrait:mt-6 zflip3portrait:rounded-xl tablets7portrait:h-[720px] ipadProPortrait:translate-x-[96px] tablets7portrait:mt-10 tablets7portrait:translate-x-[78px] ipadairportrait:mt-0 ipadairportrait:rounded-none lg:translate-x-0 md:h-[680px] lg:mt-0 md:mt-7 lg:h-[440px] w-full h-[400px] md:rounded-3xl rounded-none relative">
                <div className="absolute md:top-10 top-5 flex flex-col lg:left-[68px] iphonexr18:left-16 iphone12:left-14 iphone14plus:left-[78px] left-10 md:gap-y-5 gap-y-2">
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium lg:text-lg md:text-[40px]">
                      ID ADMIN
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={user._id}
                      className="border lg:px-4 px-4 rounded-3xl border-slate-900 md:w-[650px] md:h-[48px] md:text-2xl lg:text-base lg:w-[400px] lg:h-[38px] w-[200px] h-[30px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium lg:text-lg md:text-[40px]">
                      NAME
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={user.username}
                      className="border rounded-3xl lg:px-4 px-4 border-slate-900 md:w-[650px] md:text-2xl lg:text-base md:h-[48px] lg:w-[400px] lg:h-[38px] w-[200px] h-[30px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium lg:text-lg md:text-[40px]">
                      EMAIL
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={user.email}
                      className="border rounded-3xl lg:px-4 px-4 border-slate-900 md:w-[650px] md:h-[48px] md:text-2xl lg:text-base lg:w-[400px] lg:h-[38px] w-[200px] h-[30px]"
                    />
                  </div>
                 
                </div>
                <div className="absolute md:top-[590px] lg:top-[380px] ipadProPortrait:top-[530px] ipadairportrait:top-[530px] top-[250px] left-7 iphonexr18:left-[53px] iphone12:left-[45px] iphone14plus:left-[66px] md:left-[110px] lg:left-[210px] lg:mt-1 flex md:w-auto px-4 md:px-0">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <button className="md:py-5 py-2 md:px-28 lg:px-10 lg:py-2 px-[70px] md:text-3xl lg:text-base border border-slate-900 md:rounded-full lg:rounded-3xl rounded-3xl w-full md:w-auto">
                      Edit
                    </button>
                    <button onClick={handleLogout} className="md:py-5 py-2 px-[70px] md:px-28 lg:px-10 lg:py-2 md:text-3xl lg:text-base border border-slate-900 bg-blue-500 text-white md:rounded-full rounded-3xl lg:rounded-3xl w-full md:w-auto">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
