import axios from "axios";
import { useState, useEffect } from "react";

const FormAddRoom = ({ id }) => {
  const [formData, setFormData] = useState({
    name: "",
    price_perhour: "",
    status: "Available",
    photo: null,
    category: "",
    facilities: [],
  });
  const [facilitiesOptions, setFacilitiesOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch available facilities for selection
    const fetchFacilities = async () => {
      try {
        const res = await axios.get(
          "https://ceria-music-production-4534.up.railway.app/api/facilities"
        );
        if (res.status === 200) {
          setFacilitiesOptions(res.data.data);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch facilities.");
      }
    };
    fetchFacilities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  };

  const handleFacilitiesChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      facilities: selectedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("price_perhour", formData.price_perhour);
    form.append("status", formData.status);
    form.append("photo", formData.photo);
    form.append("category", formData.category);
    form.append("facilities", JSON.stringify(formData.facilities));

    try {
      const res = await axios.post(
        "https://ceria-music-production-4534.up.railway.app/api/room/add",
        form
      );

      if (res.status === 200) {
        setSuccessMessage("Room added successfully!");
        setFormData({
          name: "",
          price_perhour: "",
          status: "Available",
          photo: null,
          category: "",
          facilities: [],
        });
      } else {
        setErrorMessage(res.data.message || "Failed to add room.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Room</h2>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Room Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price_perhour"
            className="block text-gray-700 font-medium mb-2"
          >
            Price Per Hour
          </label>
          <input
            type="number"
            id="price_perhour"
            name="price_perhour"
            value={formData.price_perhour}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="facilities" className="block text-gray-700 font-medium mb-2">
            Facilities
          </label>
          <select
            id="facilities"
            name="facilities"
            multiple
            value={formData.facilities}
            onChange={handleFacilitiesChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {facilitiesOptions.map((facility) => (
              <option key={facility._id} value={facility._id}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">
            Upload Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormAddRoom;
