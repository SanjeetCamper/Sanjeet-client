import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const OrderContext = createContext();
const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const OrderProvider = ({ children }) => {
  const { getToken } = useAuth();

  /* ===============================
     STATE
  ================================ */
  const [order, setOrder] = useState({  // my orders list
    customerId: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    camperQty: 10,
    villageId: "",
    ratePerCamper: 20,
    baseAmount: 0,
    deliveryCharge: 0,
    grandTotal: 0,
    deliveryDate: "",
    deliveryTimeSlot: "",
  });

  const [loading, setLoading] = useState(false);

  /* ===============================
     PLACE ORDER
     POST /api/orders
  ================================ */
  const placeOrder = async (payload) => {
    try {
      setLoading(true);
      const token = await getToken();
      // console.log(token);
      console.log(payload);
      // console.log("TOKEN:", token);
      const res = await axios.post(`${API_BASE}/api/orders`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data; // { success, orderId, message }
    } catch (err) {
      throw err.response?.data || { message: "Order failed" };
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     GET MY ORDERS
     GET /api/orders/my
  ================================ */
  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const res = await axios.get(`${API_BASE}/api/orders/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.orders || [];
    } catch (err) {
      throw err.response?.data || { message: "Failed to load orders" };
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     CONTEXT VALUE
  ================================ */
  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
        loading,
        placeOrder,
        fetchMyOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

/* ===============================
   CUSTOM HOOK
================================ */
export const useOrder = () => useContext(OrderContext);
