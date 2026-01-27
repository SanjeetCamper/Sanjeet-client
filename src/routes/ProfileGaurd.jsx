import { useContextUser } from "../context/UserContext";
import FullPageLoader from "../components/FullPageLoader";
import CompleteProfile from "../pages/CompleteProfile";

const ProfileGuard = ({ children }) => {
  const { user, loading } = useContextUser();

  if (loading) return <FullPageLoader />;

  // logged in but profile incomplete
  if (user && !user.isProfileComplete) {
    return <CompleteProfile />;
  }

  return children;
};

export default ProfileGuard;
