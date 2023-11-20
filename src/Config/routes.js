import Admin from "../Pages/Admin";
import RegisterPage from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import NotFound from "../Pages/NotFound";

const routes = [
  {
    path: "/admin",
    component: Admin,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: "/",
    component: RegisterPage,
    isPrivate: false,
  },
  {
    path: "/*",
    component: NotFound,
    isPrivate: true,
  },
];

export default routes;
