import React from "react";
import Logo from "../../../assets/logo.png";
import Bg from "../../../assets/bgLandingPages.jpg";

const AdminProfile = () => {
  return (
    <>
      <div className="md:min-h-[1000px] lg:min-h-[600px] min-h-52">
        <div className="lg:px-11 lg:translate-x-0 lg:py-5 md:translate-x-56 md:py-3 px-28 py-3 ">
          <img src={Logo} alt="" className="md:w-[300px] w-[180px]" />
        </div>

        <div className="flex items-center justify-center">
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
                      className="border rounded-3xl border-slate-900 md:w-[650px] md:h-[48px] lg:w-[400px] lg:h-[38px] w-[200px] h-[30px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium lg:text-lg md:text-[40px]">
                      ID ADMIN
                    </label>
                    <input
                      type="text"
                      readOnly
                      className="border rounded-3xl border-slate-900 md:w-[650px] md:h-[48px] lg:w-[400px] lg:h-[38px] w-[200px] h-[30px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium lg:text-lg md:text-[40px]">
                      ID ADMIN
                    </label>
                    <input
                      type="text"
                      readOnly
                      className="border rounded-3xl border-slate-900 md:w-[650px] md:h-[48px] lg:w-[400px] lg:h-[38px] w-[200px] h-[30px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium lg:text-lg md:text-[40px]">
                      ID ADMIN
                    </label>
                    <input
                      type="text"
                      readOnly
                      className="border rounded-3xl border-slate-900 md:w-[650px] md:h-[48px] lg:w-[400px] lg:h-[38px] w-[200px] h-[30px]"
                    />
                  </div>
                </div>
                <div className="absolute md:top-[590px] lg:top-[380px] top-[280px] left-7 iphonexr18:left-[53px] iphone12:left-[45px] iphone14plus:left-[66px] md:left-[110px] lg:left-[210px] lg:mt-1 flex md:w-auto px-4 md:px-0">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <button className="md:py-5 py-2 md:px-28 lg:px-10 lg:py-2 px-[70px] md:text-3xl lg:text-base border border-slate-900 md:rounded-full lg:rounded-3xl rounded-3xl w-full md:w-auto">
                      Edit
                    </button>
                    <button className="md:py-5 py-2 px-[70px] md:px-28 lg:px-10 lg:py-2 md:text-3xl lg:text-base border border-slate-900 bg-blue-500 text-white md:rounded-full rounded-3xl lg:rounded-3xl w-full md:w-auto">
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
