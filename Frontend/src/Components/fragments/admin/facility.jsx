import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Navbar from "../../components/fragments/Navbar";
import Sidebar from "../../components/fragments/Sidebar";

const Facility = () => {
  const [facilities, setFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get("/api/facilities");
        setFacilities(response.data);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };
    fetchFacilities();
  }, []);

  const handleSearch = () => {
    const filtered = facilities.filter((facility) =>
      facility.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFacilities(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/facilities/${id}`);
      setFacilities(facilities.filter((facility) => facility.id !== id));
    } catch (error) {
      console.error("Error deleting facility:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full h-full p-6">
        <Navbar />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Facilities</h1>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Add Room
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-l px-3 py-2 focus:outline-none"
          />
          <button
            className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Facility Name
                </th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility) => (
                <tr key={facility.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    {facility.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 flex justify-center gap-2">
                    <button className="text-yellow-500 hover:text-yellow-700">
                      <FaEye />
                    </button>
                    <button className="text-orange-500 hover:text-orange-700">
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(facility.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button className="px-3 py-1 border rounded-l bg-gray-100 hover:bg-gray-200">
            &laquo;
          </button>
          <span className="px-4 py-2 border-t border-b">1</span>
          <button className="px-3 py-1 border rounded-r bg-gray-100 hover:bg-gray-200">
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Facility;
