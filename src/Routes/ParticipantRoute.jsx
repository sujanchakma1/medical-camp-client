import useAuth from '../Hook/useAuth';
import useUserRole from '../Hook/useUserRole';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Pages/Loading/Loading';

const ParticipantRoute = ({children}) => {
  const {user, loading} = useAuth()
  const {role, isRoleLoading} = useUserRole()
  const location = useLocation()

  if(loading || isRoleLoading){
    return <Loading></Loading>
  }
  if(!user || role !== "user"){
    return <Navigate state={location.pathname} to="/forbidden"></Navigate>
  }
  return children
};

export default ParticipantRoute;