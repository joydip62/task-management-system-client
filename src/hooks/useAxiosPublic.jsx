import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://task-management-system-server-six.vercel.app",
});
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;