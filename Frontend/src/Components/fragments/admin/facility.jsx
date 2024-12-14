import React, { useEffect, useState } from "react";
import axios from "axios";

const Facility = () => {
  const [facilities, setFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const itemPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get(
        "https://ceria-music-production-4534.up.railway.app/api/facilities",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setFacilities(response.data.data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const res = await axios.get(
        `https://ceria-music-production-4534.up.railway.app/api/facility/search?name=${query}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setFacilities(res.data.data);
    } catch (error) {
      console.error("Error searching facilities:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      fetchFacilities();
    } else {
      setSearchTerm(value);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = facilities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(facilities.length / itemPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center items-start p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col w-full max-w-4xl bg-white shadow-md rounded-lg p-6 lg:max-w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Facilities</h1>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300">
            Add Facility
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded-l px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-300"
            onClick={() => handleSearch(searchTerm)}
          >
            Search
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((facility, index) => (
              <tr key={facility._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1 + (currentPage - 1) * itemPerPage}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {facility.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex flex-wrap gap-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            disabled={currentPage === totalPages}
            onClick={goToNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Facility;
