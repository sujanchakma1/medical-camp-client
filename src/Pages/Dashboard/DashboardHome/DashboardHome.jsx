import React from "react";
import AdminHome from "../AdminHome/AdminHome";
import UserHome from "../UserHome/UserHome";
import useUserRole from "../../../Hook/useUserRole";
import Loading from "../../Loading/Loading";

const DashboardHome = () => {
  const { role, isRoleLoading } = useUserRole();
  if (isRoleLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      {role === "admin" ? <AdminHome></AdminHome> : <UserHome></UserHome>}
    </div>
  );
};

export default DashboardHome;
