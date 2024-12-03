import { CiCircleChevUp, CiTwitter } from "react-icons/ci";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import maghfur from "../../../assets/teams/maghfur.jpg";
import alif_fadillah from "../../../assets/teams/alif_fadillah.jpg";

const Team = () => {
    const cards = [
      {
        id: 1,
        img: `${maghfur}`,
       work:"Frontend Developer",
        name: "Maghfur Hasani",
      },
      {
        id: 2,
        img: `${alif_fadillah}`,
       work:"Backend Developer",
        name: "Alif Fadillah Ummar",
      },
      {
        id: 3,
        img: "https://s3-alpha-sig.figma.com/img/c240/3e84/21e65fee2c55fe220544c79bd37b4294?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F15WnOjG7CC-qugmKw5rlbZD1xlwYgjIqAULuh1oyEuFvOcW-1YcJx7sZz88gGW0j~vxMkgyL7JxB9IOJ6o6MmL~hITC~EVCqB9RtTFJh0cYKoxuPxTiAF14iv0fjMf5yDAmlHEM8aN9wyZIB58dFj1fTjDJmRs430ksMzuEcv4bY3wqzpdM-cCa5JdwdXVM87gVqjuyYYcc9qDZ3my6jSZsHlezvIntb2vE3erAa8r5wsqyVmzD8-XWf7tiKdzXw40GltjU1tcz7IoCXX-UUxYlAB3NxcIfF0FvrRPPFJNElcFUvgmszXR8fp6ld5EdodxI6XxYprWGa2v4Oct8Sw__",
       work:"Marketing Head",
        name: "Kathryn Murphy",
      },
      
    ];
    return (
      <div className=" py-10 font-['Poppins']" id="team">
        <div className="container mx-auto">
          <div className="">
            <h1 className="text-4xl font-bold flex justify-center  font-['Poppins']">
              Our Team
            </h1>
           
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-3 py-10 px-5 md:justify-between">
            {cards.map((card, i) => (
              <div key={i} className="flex flex-col items-center  relative rounded-xl">
               <div className="relative card">
               <img src={card.img} alt="" className="w-80 h-64 bg-[#DEDEDE] aspect-4/3 object-cover object-center rounded-[10px] shadow-sm shadow-black" />
                
               </div>
                <p className="text-2xl  font-semibold text-black py-2">
                  {card.name}
                </p>
                <p>{card.work}</p>
                <div className="flex flex-row gap-5 p-3 text-xl">
                <FaFacebook className="text-orange-500"/>
                <CiTwitter/>
                <FaLinkedin/>
                <CiCircleChevUp/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Team;
  