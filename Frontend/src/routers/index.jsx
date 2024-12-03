import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/home";
import Admin from "../Pages/admin";
import Booking from "../Pages/booking";

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
    element: <Booking/>
  }
]);

export default router;