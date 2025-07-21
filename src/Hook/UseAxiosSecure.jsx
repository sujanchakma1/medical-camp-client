import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOutUser } = useAuth(); // assume user contains accessToken
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user?.accessToken}`;
    return config;
  });

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error?.response?.status;
      console.log("inside interceptor : ", status);
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logOutUser()
          .then(() => {
            Swal.fire({
              title: `Log Out for ${status} Status!`,
              icon: "success",
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/login");
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
            });
          });
      }
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
