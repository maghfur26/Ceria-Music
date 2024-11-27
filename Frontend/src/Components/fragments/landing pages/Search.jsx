import CardStudio from "../../elements/CardStudio";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import axios from "axios";

const Search = () => {
  const [listStudio, setListStudio] = useState([]);

  const getRooms = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/room");
      if (res.status === 200) {
        return setListStudio(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    AOS.init();
    getRooms();
  }, []);

  return (
    <div className="flex flex-col font-manrope bg-slate-100 py-10 my-20">
      <h1
        className="pb-4 text-[30px] font-thin ml-7 mb-4 first-letter:text-5xl first-letter:font-bold first-letter:text-blue-500 lg:ml-10"
        data-aos="fade-right"
        data-aos-duration="700"
        data-aos-delay="200"
      >
        <ReactTyped
          strings={["Search Studio", "Look For Studio", "Find Studio"]}
          typeSpeed={170}
          backSpeed={100}
          backDelay={1500}
          loop
        />
      </h1>
      <div
        className="flex h-[342px] w-[95dvw] rounded-3xl mx-auto justify-center items-center flex-col shadow-black drop-shadow-lg"
        style={{
          backgroundImage: `url(${"src/assets/bg.jpg"})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-delay="100"
      >
        <div className="bg-white border border-black px-5 lg:px-10 py-5 rounded-3xl flex flex-col md:flex-row justify-center gap-2 w-full lg:w-[1100px]">
          <div className="flex justify-center items-center flex-row border border-black p-1 rounded-full w-full md:w-[223px] lg:w-[223px] text-2xl lg:text-[30px]">
            <select
              className="text-lg px-4 p-1 outline-none bg-transparent w-full"
              name="room"
              id="room"
              defaultValue="Category"
            >
              <option className="opacity-50" disabled>
                Category
              </option>
              <option value="studio A">Studio A</option>
              <option value="studio B">Studio B</option>
              <option value="studio C">Studio C</option>
            </select>
          </div>
          <div className="text-xl px-4 flex justify-center items-center flex-row border border-black p-1 rounded-full w-full md:w-[198px] lg:w-[198px]">
            <select
              name="facility"
              id="facility"
              className="bg-transparent px-4 outline-none w-full"
              defaultValue="Facility"
            >
              <option className="opacity-50" disabled>
                Facility
              </option>
              <option value="ac room">AC Room</option>
              <option value="kipas angin">Kipas Angin</option>
            </select>
          </div>
          <button className="text-xl text-center bg-slate-900 text-white px-5 rounded-full font-semibold hover:bg-slate-800 w-full md:w-[198px] lg:w-[198px]">
            Search
          </button>
        </div>
      </div>
      <div className="w-full justify-center flex-shrink flex-grow mt-6 mb-10 flex flex-wrap lg:justify-around box-border gap-10 lg:gap-0">
        {listStudio.map((studio) => {
          const formattedPrice = formatPrice(studio.price_perhour);
          return (
            <CardStudio
              className="lg:my-14"
              img={`http://localhost:8080/${studio.photo}`}
              title={studio.name}
              status="Available"
              price={formattedPrice}
              key={studio._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
