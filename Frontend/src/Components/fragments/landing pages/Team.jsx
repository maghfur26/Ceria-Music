import { CiCircleChevUp, CiTwitter } from "react-icons/ci";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Team = () => {
    const cards = [
      {
        id: 1,
        img: "https://s3-alpha-sig.figma.com/img/d90d/aa9a/495f0295d092af5b214f4b8cdf301aab?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E2qy9FO5mHbdqkojcfejfHFV56P~zTHid3fRZ~tq6pPvtcsqKATwAOjpAx1hxY6KpBZZoNpYOTmXLI97KOukURIql8KH0Pt76-K52MSYEpCpPHUlQkKk-8FyLA~0V21IKxAXNB2uWPMgzXsDpTXsQIGzzggIyYhKsnjtPbsnQNE2xRse9Zy7aXc6PwZnV6q3D3OutQ5fQDvZnD--aUbgnX8OnDcNdSTGLg85-CWOsl4fRE~8CrIvExqpDCyNoRbDXlc3hGafq3DmBeh3DX3OcSuecZqDBxOvXgi-ojETtfPz7QiMaD5Nj4XaQgGboN7X9DFN53le2ktvHZwdJY8S6A__",
       work:"Project Manager",
        name: "Harly Rayan",
      },
      {
        id: 2,
        img: "https://s3-alpha-sig.figma.com/img/2deb/15cb/f9a9efd26172c9ef8555c98f75956a6c?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eQrJIsb7x8sAe7SVp2u9TyY76-R-Fpe72NgTFyoekyhzPOsGIeOdMBRLbGVNJaI8DsOtOzSgW85B-vuY83KGuoqWJMviRn5rQgUB-yeCLNU04yAJevqtLO2pasDmjy2Mj1thx3AcVx0rgcNO7cYcOambydyXhgGgVJWBJ0gK0M9pA8VrulDkn0p~MEYPx6boQBxmwUlnA2wR89XHOI~WKusmDnnXlSzPWZizsp7bwhQ53Nd~9ONszbd70MzSX7TQzZQg~fYxkBaBbEDvfr5DCuN7jc7y-bDZUiwa9xWJJqn32FDZD5-uho6bkF2UMQsHrFIFVICdpXc89ly3ze5WaA__",
       work:"Head of Services",
        name: "Harly Rayan",
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
          <div className=" grid grid-cols-1 md:grid-cols-3  gap-3 py-10 px-5">
            {cards.map((card, i) => (
              <div key={i} className="flex flex-col items-center  relative rounded-xl ">
               <div className="relative">
               <img src={card.img} alt="" className="w-80 h-64 bg-[#DEDEDE]" />
                
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
  