import { createContext, useContext, useEffect, useState } from "react";
import { useAuth, useUser as useClerkUser } from "@clerk/clerk-react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isSignedIn, getToken, isLoaded } = useAuth();
  const { user: clerkUser } = useClerkUser();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const syncUser = async () => {
      if (!isLoaded) return; // ⏳ wait for Clerk

      // Clerk abhi auth decide nahi kar paaya
      if (typeof isSignedIn === "undefined") {
        return;
      }

      // Clerk ready hai, user logged out
      if (isSignedIn === false) {
        setLoading(false);
        return;
      }

      if (!clerkUser) return;

      try {
        const token = await getToken();

        const res = await fetch(`${backendUrl}/api/users/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: clerkUser.fullName,
            email: clerkUser.primaryEmailAddress?.emailAddress,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("User sync failed");
      } finally {
        setLoading(false);
      }
    };

    syncUser();
  }, [isSignedIn, clerkUser]);

  return (
    <UserContext.Provider value={{ user, loading, setUser,backendUrl }}>
      {children}
    </UserContext.Provider>
  );
};

export const useContextUser = () => useContext(UserContext);
