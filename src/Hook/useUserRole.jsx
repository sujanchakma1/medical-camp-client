// src/Hooks/useUserRole.js
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./UseAxiosSecure";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user,loading } = useAuth();
  const email = user?.email;

  const {
    data: roleData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-role", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user?.email}`);
      return res.data;
    },
    enabled:
      !loading && !!user?.email && !!user?.accessToken
  });

  return {
    role: roleData?.role,
    isRoleLoading: isLoading,
    isRoleError: isError,
  };
};

export default useUserRole;
