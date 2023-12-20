import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";
import useAgent from "../../../hooks/useAgent";
import logo from "../../../assets/homelogo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();

  const from = location.state?.from?.pathname || "/";

  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          text: "You Have Successfully Logout",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong! ${err.message}`,
        });
      });
  };
  const listItem = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="allProperties">All properties</NavLink>
      </li>
      
      {user && isAdmin && (
        <li>
          <NavLink to="/dashboard/adminHome">Dashboard</NavLink>
        </li>
      )}

      {user && !isAdmin && isAgent && (
        <li>
          <NavLink to="/dashboard/agentHome">Dashboard</NavLink>
        </li>
      )}

      {user && !isAdmin && !isAgent && (
        <>
          <li>
            <NavLink to="/dashboard/userHome">Dashboard</NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/userWishLists">WishList</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {listItem}
          </ul>
        </div>
        <div className="flex items-center">
          <img src={logo} alt="" className="w-2/3 md:w-20" />
          <b className="hidden md:block md:text-2xl w-1/2 md:w-full ">Dream Home</b>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{listItem}</ul>
      </div>
      <div className="navbar-end">
        <ul className="gap-5 menu-horizontal md:menu md:menu-horizontal px-1">
          {user ? (
            <>
              <li>
                <p className="text-xl">{user?.displayName}</p>
              </li>
              <li>
                <div className="w-8 md:w-16 rounded-full">
                  <img alt="" src={user?.photoURL} />
                </div>
              </li>
              <button
                className="btn btn-info btn-sm md:btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>

              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
