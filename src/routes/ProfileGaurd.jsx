import { useContextUser } from "../context/UserContext";
import FullPageLoader from "../components/FullPageLoader";
import CompleteProfile from "../pages/CompleteProfile";
import { useEffect, useState } from "react";

const ProfileGuard = ({ children }) => {
  const { user, loading } = useContextUser();
  const [timeoutDone, setTimeoutDone] = useState(false);

  const isOffline = !navigator.onLine;

  // ⏱ loader safety timeout (2 sec)
  useEffect(() => {
    const t = setTimeout(() => setTimeoutDone(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // ONLINE normal flow
  if (!isOffline && loading) {
    return <FullPageLoader value="Checking Profile" />;
  }

  // OFFLINE + cached user → allow
  if (isOffline && user) {
    return children;
  }

  // ONLINE + profile incomplete
  if (!isOffline && user && !user.isProfileComplete) {
    return <CompleteProfile />;
  }

  // OFFLINE + no user after timeout
  if (isOffline && timeoutDone && !user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold">Offline Mode</h2>
        <p className="text-gray-500 mt-2">
          Complete profile requires internet connection
        </p>
      </div>
    );
  }

  return children;
};

export default ProfileGuard;
