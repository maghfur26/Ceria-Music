import axios from "axios";
import Admin from "../admin/";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Booking = () => {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const getData = async (page = 1) => {
    try {
      const getToken = sessionStorage.getItem("token");

      if (!getToken) {
        navigate("/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${getToken}`,
      };

      const res = await axios.get(
        `https://ceria-music-production-4534.up.railway.app/api/rooms?page=${page}&search=${searchQuery}`,
        { headers }
      );

      if (res.status === 200) {
        setRooms(res.data.data.rooms);
        setCurrentPage(res.data.data.currentPage);
        setTotalPages(res.data.data.totalPages);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.error("Error getting data", error.response || error.message);

      if (error.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Token tidak valid. Silakan login kembali.",
        }).then(() => {
          sessionStorage.clear();
          navigate("/login");
        });
      }
    }
  };

  const handleSearch = () => {
    getData(1); 
  };

  const handleDelete = async (roomId) => {
    try {
      const getToken = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${getToken}` };

      const res = await axios.delete(
        `https://ceria-music-production-4534.up.railway.app/api/rooms/${roomId}`,
        { headers }
      );

      if (res.status === 200) {
        Swal.fire("Deleted!", res.data.message, "success");
        getData(currentPage); 
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting room", error.response || error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <Admin>
      <div className="w-full flex flex-col gap-8 p-6 bg-gray-50">
        <div className="w-full px-6 py-4 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Manage Bookings</h2>
            <button
              onClick={() => navigate("/add-room")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Room
            </button>
          </div>

          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Search
            </button>
          </div>

          <table className="w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className="border-t">
                  <td className="px-4 py-2">{room.name}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => navigate(`/rooms/${room.id}/edit`)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/rooms/${room.id}`)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Admin>
  );
};

export default Booking;
