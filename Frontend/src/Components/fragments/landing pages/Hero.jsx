import React from "react";
import bgLanding from '../../../assets/bgLandingPages.jpg'

const HeroSection = () => {
  return (
    <section className="relative py-10 flex flex-col items-center">
      {/* Image Container */}
      <div className="relative w-[90%] max-w-6xl">
        {/* Background Image */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={bgLanding}
            alt="Music Studio"
            className="w-[1200px] h-[300px] md:h-[400px] rounded-2xl object-cover"
          />
        </div>

        {/* Card */}
        <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 w-[80%] bg-white shadow-lg rounded-xl p-3 md:p-12 text-center">
          <h1 className="text-xl md:text-[60px]  font-normal md:mb-8">
          Discover Your dream  
          </h1>
          <span className="text-xl md:text-[60px] font-normal">
          Music Studio with us!
          </span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-16 text-center text-gray-600 text-sm space-y-2">
        <p className="text-[15px] font-medium text-[#2E343F] md:mb-3">Are you a musician, producer, or content creator looking for <br /> the perfect space to bring your creative visions to life? Look no <br /> further.</p>
        <button className="w-[170px] h-[45px] bg-blue-500 text-white font-semibold text-xl rounded-full hover:bg-blue-600 transition">
      Explore More
    </button>
    
    <div className="mt-6 flex justify-center gap-8 text-gray-600 text-sm">
        <p>Excellent 10,000+ reviews</p>
        <p>People Have Successfully Found Their Dream Studio</p>
      </div>
    
      </div>
    </section>
  );
};

export default HeroSection;
