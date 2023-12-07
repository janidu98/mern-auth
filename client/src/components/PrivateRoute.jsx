import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

  const { currentUser } = useSelector((state) => state.user);

  //if current user is available, it is navigate to children, otherwise navigate sign-in page
  return currentUser ? <Outlet /> : <Navigate to='/sign-in'/>
}

export default PrivateRoute
