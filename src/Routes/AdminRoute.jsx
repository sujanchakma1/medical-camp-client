import React from 'react';
import useAuth from '../Hook/useAuth';
import useUserRole from '../Hook/useUserRole';
import Loading from '../Pages/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({children}) => {
  const {user,loading} = useAuth()
  const {role, isRoleLoading} = useUserRole()
  const location = useLocation()

  if(loading || isRoleLoading){
    return <Loading></Loading>
  }

  if(!user || role !== "admin"){
    return <Navigate state={location.pathname} to="/forbidden"></Navigate>
  }

  return children
};

export default AdminRoute;