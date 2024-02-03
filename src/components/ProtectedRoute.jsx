import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ children }) {
  // Check if sessionData is not null.
  // Example scenario: when user directly accesses a protected API endpoint, 
  // http://localhost:3000/dashboard, this function gets called first. If the
  // user is not logged in, direct the user to login page.
  var isLoggedIn;
  const sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
  if (sessionData){
    isLoggedIn = sessionData.isLoggedIn;
  } else {
    isLoggedIn = false;
  }
  if (!isLoggedIn) {
    return <Navigate to={ "/login" } />
  }
  return children ? children : <Outlet />
}

