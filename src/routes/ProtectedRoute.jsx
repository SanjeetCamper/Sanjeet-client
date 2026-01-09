// import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useContextUser } from "../context/UserContext";
import FullPageLoader from "../components/FullPageLoader";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const { user, loading } = useContextUser();

  if (!isLoaded || loading) return <FullPageLoader value="Completing Request" />;

  if (!isSignedIn || !user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
