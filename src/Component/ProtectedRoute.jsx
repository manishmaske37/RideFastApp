import { Navigate } from "react-router-dom";

const isTokenValid = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now(); // not expired
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  if (!isTokenValid()) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
