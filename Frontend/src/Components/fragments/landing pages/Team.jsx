import { CiCircleChevUp, CiTwitter } from "react-icons/ci";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import maghfur from "../../../assets/teams/maghfur.jpg";
import alif_fadillah from "../../../assets/teams/alif_fadillah.jpg";
<<<<<<< HEAD
import rendy from "../../../assets/teams/rendy.jpg";

const Team = () => {
  const cards = [
    {
      id: 1,
      img: `${maghfur}`,
      work: "Frontend Developer",
      name: "Maghfur Hasani",
    },
    {
      id: 2,
      img: `${alif_fadillah}`,
      work: "Backend Developer",
      name: "Alif Fadillah Ummar",
    },
    {
      id: 3,
      img: `${rendy}`,
      work: "Frontend Developer",
      name: "Alif Rendy Pahlevi",
    },
    {
      id: 4,
      img: `https://`,
      work: "ui/ux",
      name: "dsadas"
    },
    {
      id: 5,
      img: `sda`,
      work: 'Backend Developer',
      name: "wfads"
    }
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
            <div
              key={i}
              className="flex flex-col items-center  relative rounded-xl"
            >
              <div className="relative card">
                <img
                  src={card.img}
                  alt=""
                  className="w-80 h-64 bg-[#DEDEDE] aspect-4/3 object-cover object-center rounded-[10px] shadow-sm shadow-black"
                />
=======
import rendy from "../../../assets/teams/rendy.jpg"
import bella from "../../../assets/teams/bella.jpg"

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
        img:`${rendy}`,
       work:"Frontend Developer",
        name: "Alif Rendy Pahlevi",
      },
      {
        id:4,
        img:`${bella}`,
        work:"UI/UX",
        name:"Salsabila",
      }
      
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
>>>>>>> 10976a0ff52213a6c0020542810489146d0939e2
              </div>
              <p className="text-2xl  font-semibold text-black py-2">
                {card.name}
              </p>
              <p>{card.work}</p>
              <div className="flex flex-row gap-5 p-3 text-xl">
                <FaFacebook className="text-orange-500" />
                <CiTwitter />
                <FaLinkedin />
                <CiCircleChevUp />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
