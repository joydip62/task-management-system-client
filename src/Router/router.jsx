import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import Main from "../layout/Main";
import AboutUs from "../pages/AboutUs/AboutUs";
import Blog from "../pages/Blog/Blog";
import ContactUs from "../pages/ContactUs/ContactUs";
import AddTask from "../pages/Dashboard/AddTask/AddTask";
import EditTask from "../pages/Dashboard/AllTask/EditTask";
import TaskManager from "../pages/Dashboard/AllTask/TaskManager";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    // errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },

      {
        path: "/contactUs",
        element: <ContactUs />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/userHome",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "addTask",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "allTask",
        element: (
          <PrivateRoute>
            <TaskManager />
          </PrivateRoute>
        ),
      },

      {
        path: "taskEdit/:id",
        element: <EditTask />,
        loader: ({ params }) => fetch(`http://localhost:5000/task/${params.id}`),
      },
    ],
  },
]);
