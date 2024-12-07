import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/home";
import Admin from "../Pages/admin";
import PaymentPages from "../Pages/paymentPages";
import DetailRoomPages from "../Pages/detailRoom";
import Booking from "../Pages/booking";
import Login from '../Pages/login';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin/>
  },
  {
    path: "/room/:id",
    element: <DetailRoomPages/>
  },
  {
    path: "/booking/:id",
    element: <Booking/>
  },
  {
    path: "/payment/:id",
    element: <PaymentPages/>
  },
  {
    path: '/login',
    element: <Login/>
  },
]);

export default router;