import { CiHome, CiLocationOn } from "react-icons/ci"
import { FaDollarSign } from "react-icons/fa"

const Search = () => {
  return (
    <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold py-3">Search of Residences</h1>
        <div className="flex flex-col md:flex-row  justify-center gap-2 px-3">
            <div className="flex flex-row border-2 border-black p-1">
                <input type="text" name="Location" placeholder="Location" id="" className="outline-none"  />
                <CiLocationOn className="flex justify-self-center text-xl text-black my-auto"/>
            </div>
            <div className="flex flex-row border-2 border-black p-1">
                <input type="text" name="type" placeholder="Type" id="" className="outline-none" />
                <CiHome className="flex justify-self-center text-xl text-black my-auto"/>
            </div>
            <div className="flex flex-row border-2 border-black p-1">
                <input type="text" name="Price" placeholder="Price" id="" className="outline-none" />
                <FaDollarSign className="flex justify-self-center text-xl text-black my-auto" />
            </div>
            <button className="bg-[#FF7043] text-white py-3 px-5 rounded-lg font-bold hover:bg-blue-700  ">
          Search Now
        </button>
        </div>
    </div>
  )
}

export default Search