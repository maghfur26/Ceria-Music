import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/home";
import Admin from "../Pages/admin";
import PaymentPages from "../Pages/paymentPages";
import DetailRoomPages from "../Pages/detailRoom";
import Booking from "../Pages/booking";
import LoginPage from "../Pages/login";
import ForgetPasswordPage from "../Pages/forgetPassword";
import ResetPasswordPage from "../Pages/resetPassword";
<<<<<<< HEAD
import AdminProfilePage from "../Pages/adminProfil";
=======
import RoomPages from "../Pages/admin/room";
>>>>>>> 94a9c9ca2ae55c09980a2675b18a88ffa23ea647

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/room/:id",
    element: <DetailRoomPages />,
  },
  {
    path: "/booking/:id",
    element: <Booking />,
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
<<<<<<< HEAD
    path: '/admin-profil',
    element: <AdminProfilePage/>
  }
=======
    path: "/admin/room/",
    element: <RoomPages />,
  },
>>>>>>> 94a9c9ca2ae55c09980a2675b18a88ffa23ea647
]);

export default router;
