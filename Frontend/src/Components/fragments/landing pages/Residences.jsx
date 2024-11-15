import { FaArrowCircleRight } from "react-icons/fa";
import { IoBedSharp, IoLocation, IoWaterSharp } from "react-icons/io5";

const Residences = () => {
  const cards = [
    {
      id: 1,
      icon: "https://s3-alpha-sig.figma.com/img/f6fe/9d0d/69e2891d303faf15b9fdf0f8ac9c02a3?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a0r53kOyumE-QVNQPubXi9Z6wx9OMOCBpvLlMwOFvsL1aJgCRz7kVqR5Wp6fUGEtpMzaVtNIP~gU3DZzx-LQxCc7akyYu73z24hOyfhs7RO1Dz8h-bjXBTEXuDAl-SFoCWv--vA0Fh6Xq8OhUQhi49hQhNyBfHgU3ZcgRD7jTqBmRSRyhLeJtZ52BFq4r3eV1xQ-Vj2lmIfTse0W7NMVxxx8g8ocBR4Iae7-Kuz3OULiMfGqpp8z4NP1D~4jKYH4Rmdq2rqqNLNvvfLo7pZNC59U0eKxR3OuutY62v7ixmnomwboCeHycXTdXtB~s7uD~gvAfTB6JcwS4vk42mZpCw__",
      bed: "4 Bed",
      bath: "3 Bath",
      size: "450 sq. ft.",
      price: "$3500",
      name: "Hoodies & Sweetshirt",
    },
    {
      id: 2,
      icon: "https://s3-alpha-sig.figma.com/img/ef30/4154/6380380aa9ed0e1a64f54096264b8057?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KWPNXn-k~U~AwTEKKJfKOsW1~-t2xdMmW9LUgRP9WzLRpFDAR6eW5qTVPC60eU7vF6tz3l0rbELvuS8LDJ3RyosMDShp4jU6dPJxQSGYge8WFz9UpShfouaj0lXlAcZ6oDKY-WLnCdIsrnVZJVxAo-DihcSSv7gd-HUSkZW0Ztnijt9P~HU17DcR1bGGxfqE3J1i2Vdp94P57GnNj9j9HviSZ8JRClS5SiZ34r4NWjClmU9H4dV~RVbGhoMukTvqA2gX5Zf~Z~0gZOVZHolYvM6jmxrLj~KnwJNtnBJjyfmCHXsVQjXnY3FyanodW2zDzA4SeH2alDXFxrM7XTXkGA__",
      bed: "4 Bed",
      bath: "3 Bath",
      size: "450 sq. ft.",
      price: "$3500",
      name: "Coats & Parkas",
    },
    {
      id: 3,
      icon: "https://s3-alpha-sig.figma.com/img/2a6c/2986/8d61e7d8f12842d2367d7cfa9f11ead4?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bxRU9v-5HtITJBSFShMp5jSt2Eq0B9iPPnFTxlCd2CGU2t6wyUxr4ArsaL-gjAAFQztbKiz7-3gIbq0u5QPUVpQDNjYKn5xjN19TQyImhThY~H~eEYAfT-P3eTQ3SfxISG9~l5YoCwdannP-mp6WrlXJIaOgAieL-3WMdrAzxNFDvEEdL-xosfAifu6IWNo72lH7G31n4a1LiiswzGb3h-dBcGKXHDJGZVZDZkVf75hPm~VFa5wIgWvpkvU40bSuXF4oJ2oOaAySQNJU2DIN81Kbv~YDgM6FA1kbavuBGB3lEvCEvoZsveOSO7UJr2JL1OUi8AtlxoOiFvKlGN44yg__",
      bed: "4 Bed",
      bath: "3 Bath",
      size: "450 sq. ft.",
      price: "$3500",
      name: "Tees & T-Shirt",
    },
  ];
  return (
    <div>
      <div className="flex flex-row justify-evenly items-center gap-5 mt-10" id='residence'>
      <p>{" "}</p>
        <p className="text-3xl font-bold">Our Best Residences</p>
        <button className="text-[#FF7043] my-5  py-3 px-5 rounded-lg font-bold hover:bg-blue-700 hover:text-white flex justify-end">
               view All <FaArrowCircleRight className="text-2xl mx-3"/>
              </button>
      </div>
      <div className="container pb-10 mb-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {cards.map((card, i) => (
        <div key={i} className="px-5">
          <div className="flex flex-col sm:p-5">
            <img src={card.icon} alt="" />
            <div className="flex flex-row py-5">
              {" "}
              <IoLocation /> <p className="font-bold">{card.name}</p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-x-2">
                <IoBedSharp /> <p>{card.bed}</p>
              </div>
              <div className="flex flex-row gap-x-2">
                <IoWaterSharp /> <p>{card.bath}</p>
              </div>
              <div className="flex flex-row gap-x-2">
                {" "}
                <p> {card.size}</p>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-3xl font-semibold flex items-center">{card.price}</p>
              <button className="bg-[#FF7043] my-5 text-white py-3 px-5 rounded-lg font-bold hover:bg-blue-700 hover:text-white">
                Buy Now{" "}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Residences;
