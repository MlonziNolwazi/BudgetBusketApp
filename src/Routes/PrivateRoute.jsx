import { Navigate } from "react-router-dom";
import { useAuth } from "../uath/AuthenticationContex";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
