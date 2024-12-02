// import Details from "./Details";
// import bgLanding from "../../../assets/bg.jpg";

// const About = () => {
//   return (
//     <div className=" container mx-auto grid lg:grid-cols-12 md:grid-cols-1 gap-10 py-10 my-10 px-5">

//       <div className="grid col-span-12 lg:col-span-5 flex justify-center items-center mb-6">
//       <img
//             src={bgLanding}
//             alt="Music Studio"
//             className="w-[1200px] h-[300px] md:h-[400px] rounded-2xl object-cover"
//           />
//       </div>
    
//       <div className="grid col-span-5">
//           <h1 className="text-3xl font-bold">Get To Know Us More</h1>
//           <p>
//           music studio rental is a music studio rental service provider that serves daily rentals with different price ranges. Established since 2022, we always make improvements to customer service to be even better.
//           </p>
//         </div>
//     </div>
//   );
// };

// export default About;

import React, { useEffect } from "react";
import bgLanding from "../../../assets/bg.jpg";
import logo from "../../../assets/logo.png";
import AOS from "aos";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="relative py-10 flex flex-col items-center">
      <div className="relative w-[90%] max-w-6xl" data-aos="fade-up">
        <div className="overflow-hidden rounded-lg" data-aos="zoom-in">
          <img
            src={bgLanding}
            alt="Music Studio"
            className="w-[1200px] h-[100px] md:h-[200px] rounded-2xl object-cover"
          />
        </div>

        <div
          className="absolute -bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] bg-white shadow-lg rounded-xl p-1 lg:p-5 md:p-8 text-center"
        >
          <h1 className="md:text-5xl text-1xl lg:text-[60px]  font-normal md:mb- lg:mb-5">
            About Us
          </h1>
        </div>
      </div>

      <div
        data-aos="fade-in"
        className="mt-16 text-center text-black-600 text-sm space-y-2 flex flex-col md:flex-row items-center md:justify-between"
      >

      <div className="flex justify-center md:justify-end md:w-[30%]">
          <img
            src={logo}
            alt="Music Studio"
            className="w-[300px] h-auto md:w-[400px] object-cover rounded-2xl"
          />
        </div>

        <div className="text-left md:w-[60%] mb-6 md:mb-0">
          <p className="md:text-[23px] text-[15px] px-12 font-normal text-[#000] mb-6 md:mb-6 md:leading-6">
            Music studio rental is a music studio rental service provider that serves daily rentals with different price ranges. Established since 2022, we always make improvements to customer service to be even better.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
