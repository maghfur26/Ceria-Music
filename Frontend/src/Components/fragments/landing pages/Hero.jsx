import { IoStar } from "react-icons/io5";

const Hero = () => {
  return (
    <section className="relative bg-gray-100">
    {/* Background Image */}
    <div className="relative">
      <img
        src="https://via.placeholder.com/1200x600"
        alt="Music Studio"
        className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
      />
      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
          Discover Your Dream Music Studio with us!
        </h1>
      </div>
    </div>

    {/* Text Section */}
    <div className="mt-6 text-center">
      <p className="text-gray-700 px-4 md:px-20">
        Are you a musician, producer, or content creator looking for the
        perfect space to bring your creative visions to life? Look no further.
      </p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
          Explore More
        </button>
      </div>
      {/* Extra Info */}
      <div className="mt-6 flex justify-center gap-8 text-gray-600 text-sm">
        <p>Excellent 10,000+ reviews</p>
        <p>People Have Successfully Found Their Dream Studio</p>
      </div>
    </div>
  </section>

  );
};

export default Hero;