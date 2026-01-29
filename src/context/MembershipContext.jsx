import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { loadRazorpay } from "../utils/loadRazorpay.js";

const MembershipContext = createContext();
const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const MembershipProvider = ({ children }) => {
  const { getToken, isSignedIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activeMembership, setActiveMembership] = useState(null);
  const [status, setStatus] = useState(""); // idle | processing | verifying | success | failed

  // 🔹 fetch active membership (DASHBOARD + BLOCK BUY)
  const fetchMyMembership = async () => {
    if (!isSignedIn) return;

    try {
      const token = await getToken();
      const res = await axios.get(`${API_BASE}/api/membership/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setActiveMembership(res.data.membership || null);
    } catch {
      setActiveMembership(null);
    }
  };

  // 🔹 BUY MEMBERSHIP (Razorpay)
  const buyMembership = async (planId) => {
    try {
      setLoading(true);
      setError("");
      setStatus("processing");

      const token = await getToken();

      // 1️⃣ Create order
      const { data } = await axios.post(
        `${API_BASE}/api/payment/create-order`,
        { planId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) throw new Error("Razorpay load failed");

      const options = {
        key: data.key, // ✅ backend se lena (professional)
        order_id: data.order.id,
        amount: data.order.amount,
        currency: "INR",

        name: "Sanjeet Water Supplier",
        description: "Membership Payment",

        handler: async (response) => {
          try {
            setStatus("verifying");

            const freshToken = await getToken(); // 🔥 IMPORTANT

            const verifyRes = await axios.post(
              `${API_BASE}/api/payment/verify`,
              {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${freshToken}`,
                },
              },
            );

            setStatus("success");
            // 3️⃣ refresh membership
            await fetchMyMembership();

            if (verifyRes.data.credentialsRequired) {
              window.location.href = "/daily-user/create-credentials";
            } else {
              window.location.href = "/dailyuser";
            }
          } catch {
            // 🔥 MOST IMPORTANT UX
            setStatus("verifying");
            setError(
              "Payment received. We are confirming your membership. Please wait or reopen the app.",
            );
          }
        },

        modal: {
          ondismiss: () => {
            setStatus("idle");
            setError("Payment cancelled. No amount deducted.");
          },
        },

        theme: { color: "#21c4cc" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      setStatus("failed");
      setError("Unable to start payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) fetchMyMembership();
  }, [isSignedIn]);

  return (
    <MembershipContext.Provider
      value={{
        buyMembership,
        loading,
        error,
        status,
        activeMembership,
        fetchMyMembership,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
};

export const useMembership = () => useContext(MembershipContext);
