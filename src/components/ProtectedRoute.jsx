import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ children }) {
  // Check if the user is logged in or not
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to={ "/login" } />
  }
  return children ? children : <Outlet />
}

