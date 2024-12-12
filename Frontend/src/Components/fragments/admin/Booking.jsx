import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Booking = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getDataBooking = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get(
        "https://ceria-music-production-4534.up.railway.app/api/booking",
        header
      );
      if (res.status === 200) {
        setData(res.data.bookings);
      }
    } catch (error) {
      console.log(
        "error get booking on admin page",
        error.response || error.message
      );
    }
  };

  const getBookingDetails = async (id) => {
    try {
      const res = await axios.get(
        `https://ceria-music-production-4534.up.railway.app/api/booking/${id}`,
        header
      );
      if (res.status === 200) {
        setSelectedBooking(res.data.booking);
      }
    } catch (error) {
      console.log("error get booking details", error.response || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://ceria-music-production-4534.up.railway.app/api/booking/${id}`,
        header
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Booking deleted successfully",
          confirmButtonText: "OK",
          customClass: {
            confirmButton:
              "bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded",
          },
        });
        getDataBooking();
      }
    } catch (error) {
      console.log("error delete booking", error.response || error.message);
    }
  };

  useEffect(() => {
    getDataBooking();
  }, []);

  const filteredData = data.filter((booking) =>
    booking.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  return (
    <div className="w-full flex flex-col gap-8 p-6 bg-gray-50">
      <div className="w-full px-6 py-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Manage Bookings</h2>
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

          {/* Table */}
        <table className="w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((booking, index) => (
              <tr key={booking._id} className="border-t">
                <td className="px-4 py-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2 uppercase">{booking.name}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => getBookingDetails(booking._id)}
                    className="px-2 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        {/* Pagination Controls */}
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div style={{ width: '500px', height: '300px' }} className="bg-white p-10 rounded-xl shadow-lgflex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-4 text-center">Booking Details</h3>
            <p><strong>Name:</strong> {selectedBooking.name}</p>
            <p><strong>Date:</strong> {formatDate(selectedBooking.date)}</p>
            <p><strong>Room:</strong> {selectedBooking.room_id.name}</p>
            <p><strong>Status:</strong> {selectedBooking.status}</p>
            <div className="mt-4 flex justify-center mb-0">
            <button
              onClick={() => setSelectedBooking(null)}
              className="px-7 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
            >
              Close
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
