import { Link, useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
// import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Social from "../Shares/Social/Social";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, handleUpdateProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [showPass, setShowPass] = useState(false);

  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        handleUpdateProfile(data.name, data.photoURL)
          .then(() => {
            // create user entry in the database
            const userInfo = {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
              role: "user",
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                reset();
                navigate(location?.state ? location.state : "/");
              }
            });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "You have successfully register with email password!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...Something went wrong!",
              text: `${error.message}`,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...Something went wrong!",
          text: `${error.message}`,
        });
      });
  };

  return (
    <div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto mt-10">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold">Create an account </h2>
          <div className="border p-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter you name"
                className="input input-bordered"
                name="name"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-600">Name is required</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Enter your photo Url"
                className="input input-bordered"
                name="photoURL"
                {...register("photoURL", {
                  required: true,
                  pattern: /(https?:\/\/.*\.(?:png|jpg|jpeg))/i,
                })}
              />
              {errors.photoUrl?.type === "required" && (
                <p className="text-red-600">photoUrl is required</p>
              )}

              {errors.photoUrl?.type === "pattern" && (
                <p className="text-red-600">please enter a </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600">Email is required</p>
              )}
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPass ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}

              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
              <span
                className="absolute right-5 top-14"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </span>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#F9A51A] mb-5">
                Create an account
              </button>
              <p className="text-center">
                Already have an account? {""}
                <Link to="/login" className="text-[#F9A51A]">
                  Login
                </Link>
              </p>
            </div>
          </div>
          <div>
            <Social></Social>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
