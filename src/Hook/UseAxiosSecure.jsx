import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import UseAxios from "./useAxios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const { user } = UseAxios();
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      console.log("inside interceptor : ", error.status);
      const status = error.status;
      if (status === 403) {
        navigate("/forbidden");
      } 
      else if (status === 401) {
        // logOutUser()
        //   .then(() => {
        //     navigate("/login");
        //   })
        //   .catch(() => {});
      }
      return Promise.reject(error)
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
