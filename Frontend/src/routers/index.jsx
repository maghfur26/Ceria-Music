import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/home";
import PaymentPages from "../Pages/paymentPages";
import DetailRoomPages from "../Pages/detailRoom";
import LoginPage from "../Pages/login";
import ForgetPasswordPage from "../Pages/forgetPassword";
import ResetPasswordPage from "../Pages/resetPassword";
import AdminProfilePage from "../Pages/admin/pofile";
import RoomPages from "../Pages/admin/room";
import Dashboard from "../Pages/admin/dasbord";
import AddRoom from "../Pages/admin/addroom";
import BookingPageAdmin from "../Pages/admin/booking";
import BookingPage from "../Pages/booking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: < Dashboard/>,
  },
  {
    path: "/room/:id",
    element: <DetailRoomPages />,
  },
  {
    path: "/booking/:id",
    element: <BookingPage />,
  },
  {
    path: "/payment/:id",
    element: <PaymentPages />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordPage />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/admin/profile",
    element: <AdminProfilePage />,
  },
  {
    path: "/admin/room",
    element: <RoomPages />,
  },
  {
    path: "/admin/add-room",
    element: <AddRoom />,
  },
  {
    path: "/admin/booking",
    element: <BookingPageAdmin />,
  }
]);

export default router;
