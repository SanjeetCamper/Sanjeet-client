import { createContext, useContext, useEffect, useState } from "react";
import { useAuth, useUser as useClerkUser } from "@clerk/clerk-react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isSignedIn, getToken, isLoaded } = useAuth();
  const { user: clerkUser } = useClerkUser();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

// UseEffect
  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded) return;

      // 📴 OFFLINE MODE
      if (!navigator.onLine) {
        const cached = localStorage.getItem("cachedUser");
        if (cached) {
          setUser(JSON.parse(cached));
        }
        setLoading(false);
        return;
      }

      if (typeof isSignedIn === "undefined") return;

      if (isSignedIn === false) {
        setLoading(false);
        return;
      }

      if (!clerkUser) return;

      try {
        let token;
        try {
          token = await getToken();
        } catch {
          setLoading(false);
          return;
        }

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
  }, [isSignedIn, clerkUser, isLoaded]);


  // Refresh Users
  const refreshUser = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${backendUrl}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user); // 🔥 UI instantly update
      }
    } catch (err) {
      console.error("User refresh failed");
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loading, setUser, refreshUser, backendUrl }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useContextUser = () => useContext(UserContext);
