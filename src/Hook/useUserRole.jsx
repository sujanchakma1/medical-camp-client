// src/Hooks/useUserRole.js
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const email = user?.email

  const { data: roleData, isLoading, isError } = useQuery({
    queryKey: ["user-role", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data; 
    },
    enabled: !!email, // will only run if email exists
  });

  return {
    role: roleData?.role,
    isRoleLoading: isLoading,
    isRoleError: isError,
  };
};

export default useUserRole;
