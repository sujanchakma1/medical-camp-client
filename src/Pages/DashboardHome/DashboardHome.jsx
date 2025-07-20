import React from "react";
import useUserRole from "../../Hook/useUserRole";
import Loading from "../Loading/Loading";
import AdminHome from "../Dashboard/AdminHome/AdminHome";
import UserHome from "../Dashboard/UserHome/UserHome";

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
