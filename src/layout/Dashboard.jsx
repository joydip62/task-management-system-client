import { FaHome, FaPlus, FaTasks, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../pages/Shares/Navbar/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost drawer-button lg:hidden"
          >
            All Menu
          </label>
          <div className="px-10">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaUser />
                  My Profile
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/addTask">
                  <FaPlus />
                  Add Task
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/allTask">
                  <FaTasks />
                  All Task
                </NavLink>
              </li>
            </>

            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome />
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
