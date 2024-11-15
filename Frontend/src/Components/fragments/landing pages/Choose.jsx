import { RiSecurePaymentFill } from "react-icons/ri";
import { MdAddCall } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";

const Choose = () => {
  const cards = [
    {
      id: 1,
      icon: <RiSecurePaymentFill />,
      title: "Service Engineer",
      paragraph:
        "This is where you can find a dream home of your choice without st This is where you ",
    },
    {
      id: 2,
      icon: <MdAddCall />,
      title: "24/7 Support from the Expert Team",
      paragraph:
        "This is where you can find a dream home of your choice without st This is where you ",
    },
    {
      id: 3,
      icon: <FaMoneyBillAlt />,
      title: "Insurance",
      paragraph:
        "This is where you can find a dream home of your choice without st This is where you ",
    },
    {
      id: 4,
      icon: <CiTimer />,
      title: "Installmental Payment",
      paragraph:
        "This is where you can find a dream home of your choice without st This is where you ",
    },
  ];
  return (
    <div className="bg-[#FFE5DD] py-10 ">
      <h1 className=" flex justify-center text-3xl text-black font-bold">
        {" "}
        Why Choose Us{" "}
      </h1>
      <div
        id="About"
        className="container  mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 mt-10"
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-row items-center justify-center px-8 overflow-hidden hover:h-full p-2 rounded-lg transition-all duration-1000 ease-in-out hover:bg-sky-500 hover:text-white gap-5"
          >
            <div>
              <p className=" text-6xl  bg-[#FF916E]  text-white justify-center rounded-xl p-3 ">
                {card.icon}
              </p>
            </div>
            <div className="flex flex-col justify-evenly w-full">
              <p className="text-2xl font-semibold ">{card.title}</p>
              <p className="text-xl">{card.paragraph}</p>
              <button className="text-[#FF916E] underline flex justify-start ">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Choose;
