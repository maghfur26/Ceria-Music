import axios from "axios";
import Admin from "../admin";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";  // Pastikan Swal diimport jika digunakan untuk alert

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [chartData, setChartData] = useState([]);  // Data untuk chart
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getData = async () => {
    try {
      const getToken = sessionStorage.getItem("token");

      if (!getToken) {
        navigate("/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${getToken}`,
      };

      const resAvailableRoom = await axios.get(
        "https://ceria-music-production-4534.up.railway.app/api/total-rooms",
        { headers }
      );

      const resTotalBooking = await axios.get(
        "https://ceria-music-production-4534.up.railway.app/api/total-bookings",
        { headers }
      );

      const resTotalRevenue = await axios.get(
        "https://ceria-music-production-4534.up.railway.app/api/total-revenue",
        { headers }
      );

      if (resTotalRevenue.status === 200) {
        const revenue = resTotalRevenue.data.data.totalRevenue;  // Total revenue (misalnya: 100000000)
        setTotalRevenue(revenue);

        const currentMonth = new Date().getMonth();  // 0 = Januari, 11 = Desember
        const monthlyRevenue = new Array(12).fill(0);
        monthlyRevenue[currentMonth] = revenue;

        const chartMonthlyData = monthlyRevenue.map((revenue, index) => ({
          label: `Bulan ${index + 1}`,
          value: revenue,
        }));

        setChartData(chartMonthlyData);
      } else {
        throw new Error(resTotalRevenue.data.message);
      }

      if (resAvailableRoom.data.data && resTotalBooking.data.data) {
        setData([resAvailableRoom.data.data, resTotalBooking.data.data]);
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Admin>
        <div className="w-full flex flex-col gap-8 md:flex-row p-6 bg-gray-50">
          <div className="w-full md:w-1/2 px-6 py-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Dashboard Overview</h2>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-gray-600">Total Rooms</h3>
                <span className="text-2xl font-bold text-gray-800">{data[0]?.totalAvailableRooms}</span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-gray-600">Total Bookings</h3>
                <span className="text-2xl font-bold text-gray-800">{data[1]?.totalBookings}</span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-gray-600">Total Revenue</h3>
                <span className="text-2xl font-bold text-green-500">{formatPrice(totalRevenue)}</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[50%] md:ml-auto px-6 py-8 bg-white rounded-lg shadow-lg mt-8 md:mt-0">
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">Pemasukan Bulanan</h2>
            <BarChart
              series={[
                {
                  data: chartData.map((item) => item.value),
                },
              ]}
              height={300}
              xAxis={[{ data: chartData.map((item) => item.label), scaleType: "band" }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
        </div>
      </Admin>
    </>
  );
};

export default Dashboard;
