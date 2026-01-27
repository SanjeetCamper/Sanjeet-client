import { useUser } from "@clerk/clerk-react";
import { useContextUser } from "../context/UserContext";
import FullPageLoader from "../components/FullPageLoader";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const { user, loading } = useContextUser();

  const [timeoutDone, setTimeoutDone] = useState(false);
  const isOffline = !navigator.onLine;

  // ⏱ loader timeout (3 sec)
  useEffect(() => {
    const t = setTimeout(() => setTimeoutDone(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // 📦 cached user (offline support)
  const cachedUser = JSON.parse(localStorage.getItem("cachedUser"));

  // ONLINE normal flow
  if (!isOffline && (!isLoaded || loading)) {
    return <FullPageLoader value="Completing Request" />;
  }

  // OFFLINE + cached user → allow
  if (isOffline && cachedUser) {
    return children;
  }

  // OFFLINE + no cache
  if (isOffline && timeoutDone) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold">Offline Mode</h2>
        <p className="text-gray-500 mt-2">
          Internet connection required for first login
        </p>
      </div>
    );
  }

  // ONLINE but not signed in
  if (!isSignedIn || !user) return null;

  return children;
};

export default ProtectedRoute;
