import google from "../../../../public/google.png";
import github from "../../../../public/github.png";
import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const Social = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { googleLogin, githubLogin } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleGoogleSignIn = () => {
    googleLogin().then((res) => {
      const userInfo = {
        email: res.user?.email,
        name: res.user?.displayName,
        photoURL: res.user?.photoURL,
        role: "user",
      };
      axiosPublic.post("/users", userInfo).then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You logged in with Google!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You logged in with Google!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };

  
  const handleGithubSignIn = () => {
    githubLogin().then((res) => {
      const userInfo = {
        email: res.user?.email,
        name: res.user?.displayName,
        photoURL: res.user?.photoURL,
        role: "user",
      };
      axiosPublic.post("/users", userInfo).then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You logged in with Github!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You logged in with Github!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };


  return (
    <div className="w-full mx-auto text-center space-y-5">
      <p>Or</p>
      <div className="space-y-5">
        <button className="btn btn-outline" onClick={handleGoogleSignIn}>
          <img src={google} className="w-5" />
          Continue with Google
        </button>

        <button className="btn btn-outline" onClick={handleGithubSignIn}>
          <img src={github} className="w-5" />
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Social;
