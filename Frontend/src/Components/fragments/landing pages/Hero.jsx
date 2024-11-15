import { IoStar } from "react-icons/io5";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${"https://i.ibb.co/3c5Zj4f/imgonline-com-ua-twotoone-D8k-SN12-Fx-Bbog5-F.jpg"})`,
        backgroundPosition: "center",
        
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "lightcyan",
        height: "80vh",
      }}
      className="container mx-auto text-black flex flex-col justify-center h-full text-center w-full items-center px-10 mb-12"
    >
      <div className="relative z-10">
        <div className="text-center flex flex-col items-center justify-start">
          <h1 className="text-4xl font-bold text-black">
            Discover The Home of
            <br /> Your Dream{" "}
          </h1>
          <p className="my-5 py-3 font-semibold">
            The Real state is where you can find a dream home of <br /> your
            choice without stress
          </p>
          <button className="bg-[#FF7043] my-5 text-white py-3 px-5 rounded-lg font-bold hover:bg-blue-700 hover:text-white">
            Explore More{" "}
          </button>
          <div className="flex flex-row py-5 justify-evenly items-center gap-8">
            <div className="px-4">
              <img src="https://i.ibb.co/yF94yW2/Group.png" alt="" />
              <p>Excellent 20,000+ reviews</p>
              <div className="flex flex-row ">
                <IoStar className="text-yellow-300" />
                <IoStar className="text-yellow-300" />
                <IoStar className="text-yellow-300" />
                <IoStar className="text-yellow-300" />
                <IoStar className="text-yellow-300" />
              </div>
            </div>
            <div className="px-4">
              <img src="https://i.ibb.co/dfLTKzT/Group-33096.png" alt="" />
              <p>
                People successfully <br /> got their dream home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;