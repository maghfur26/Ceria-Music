import Details from "./Details";

const About = () => {
  return (
    <div className=" container mx-auto grid lg:grid-cols-12 md:grid-cols-1 gap-10 py-10 my-10 px-5">
      <div className="grid col-span-5">
        <img className="h-auto w-auto flex justify-self-center items-center" src="https://i.ibb.co/rtBdggX/Group-33135-1.png" alt="" />
      </div>
      <div className="grid col-span-5">
        <div className="flex flex-col justify-center items-start gap-y-3">
          <h1 className="text-3xl font-bold">Get To Know Us More</h1>
          <p>
            We are real estate agency based in indonesia that has been around
            for more than 20 years. We have helped countries people find their
            dream home. We also serve consulting requests from our clients from
            all over the world, and they are very satisfied with our excellent
            service.
          </p>
          <button className="bg-[#FF7043] my-5 text-white py-3 px-5 rounded-lg font-bold hover:bg-blue-700 ">
            Read More{" "}
          </button>
          <Details />
        </div>
      </div>
    </div>
  );
};

export default About;
