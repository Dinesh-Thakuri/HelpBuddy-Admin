import Login from "@/pages/Login";
import Dashboard from "../pages/Dashboard";
import ManageUser from "../pages/ManageUser";
import WithdrawRequest from "../pages/WithdrawRequest";
import Error404 from "@/pages/error404";
import ManageHelpPost from "@/pages/ManageHelpPost";

export const adminRoutes = [
  {
    id: "dashboard",
    path: "/",
    element: Dashboard,
    hasAdminLayout: true,
    requiredAuth: true,
  },
  {
    id: "manageUser",
    path: "/manageUser",
    element: ManageUser,
    hasAdminLayout: true,
    requiredAuth: true,
  },
  {
    id: "manageHelpPost",
    path: "/manageHelpPost",
    element: ManageHelpPost,
    hasAdminLayout: true,
    requiredAuth: true,
  },
  {
    id: "withdrawRequest",
    path: "/withdrawRequest",
    element: WithdrawRequest,
    hasAdminLayout: true,
    requiredAuth: true,
  },
  {
    id: "login",
    path: "/login",
    element: Login,
    hasAdminLayout: false,
    requiredAuth: false,
  },
  {
    id: "error404",
    path: "*",
    element: Error404,
    hasAdminLayout: false,
    requiredAuth: false,
  },
];
