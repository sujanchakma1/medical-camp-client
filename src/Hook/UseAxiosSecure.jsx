import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOutUser } = useAuth(); // assume user contains accessToken
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user?.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
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
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
              });
            });
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor when component unmounts or user changes
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
