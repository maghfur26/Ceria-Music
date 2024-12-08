import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect } from "react";
import axios from "axios";

const CardAdmin = ({...props}) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(props.url);
      if (res.status === 200) {
        setData(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:mt-10">
      <div className="flex justify-between items-center mb-4">
        <button
        //   onClick={handleAddRoom}
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add Rooms
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-48 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a 9 9 0 11-9-9 9 9 0 019 9zm-2 0a7 7 0 10-7-7 7 7 0 007 7z"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((datas) => (
          <div key={datas._id} className="bg-gray-100 rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">{datas.name}</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => console.log("Delete", (datas._id))}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
              >
                <DeleteIcon /> <span>Delete</span>
              </button>
              <button
                onClick={() => console.log("Edit", datas._id)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
              >
                <EditIcon /> <span>Edit</span>
              </button>
              <button
                onClick={() => console.log("View", datas._id)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
              >
                <RemoveRedEyeIcon /> <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardAdmin;
