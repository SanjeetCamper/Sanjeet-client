// import { Navigate } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
// import { useContextUser } from "../context/UserContext";
// import FullPageLoader from "../components/FullPageLoader";

// const PublicRoute = ({ children }) => {
//   const { isLoaded, isSignedIn } = useUser();
//   const { user, loading } = useContextUser();

//   if (!isLoaded || loading) return <FullPageLoader />;

//   // logged in + profile complete → home
//   if (isSignedIn && user?.isProfileComplete) {
//     return <Navigate to="/" replace />;
//   }

//   // logged in but profile incomplete
//   if (isSignedIn && user && !user.isProfileComplete) {
//     return <Navigate to="/complete-profile" replace />;
//   }

//   return children;
// };

// export default PublicRoute;
