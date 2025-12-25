import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useContextUser } from "../context/UserContext";
import FullPageLoader from "../components/FullPageLoader";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const { user, loading } = useContextUser();

  if (!isLoaded || loading) return <FullPageLoader />;

  // not logged in
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // profile incomplete
  if (user && !user.isProfileComplete) {
    return <Navigate to="/complete-profile" replace />;
  }

  // all good
  return children;
};

export default ProtectedRoute;
