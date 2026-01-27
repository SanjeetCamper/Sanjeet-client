import { useEffect, useRef, useState } from "react";
import { useOrder } from "../context/OrderContext.jsx";
import MyOrdersHeader from "../components/myOrders/MyOrdersHeader.jsx";
import OrderFilterBar from "../components/myOrders/OrderFilterBar.jsx";
import OrdersList from "../components/myOrders/OrdersList.jsx";
import OrdersSkeleton from "../components/myOrders/OrdersSkeleton.jsx";
import EmptyOrdersState from "../components/myOrders/EmptyOrdersState.jsx";
import { useToast } from "../context/ToastContext.jsx";
import BackButton from "../components/BackButton.jsx";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const POLL_INTERVAL = 15000; // 15 sec

const MyOrders = () => {
  const { showToast } = useToast();
  const { fetchMyOrders, loading } = useOrder();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  // 🔐 ref to store previous orders (no re-render)
  const prevOrdersRef = useRef([]);

  /* ===============================
     FETCH + COMPARE
  ================================ */
  const loadOrders = async (isPolling = false) => {
    try {
      const data = await fetchMyOrders();
      const safeOrders = Array.isArray(data) ? data : [];

      // 🔔 status change detection (polling only)
      if (isPolling && prevOrdersRef.current.length > 0) {
        detectStatusChange(prevOrdersRef.current, safeOrders);
      }

      prevOrdersRef.current = safeOrders;
      setOrders(safeOrders);
    } catch (err) {
      console.error("Failed to load orders");
    }
  };

  /* ===============================
     STATUS CHANGE DETECTOR
  ================================ */
  const detectStatusChange = (oldOrders, newOrders) => {
    oldOrders.forEach((oldOrder) => {
      const updated = newOrders.find((o) => o._id === oldOrder._id);
      if (!updated) return;

      if (oldOrder.orderStatus !== updated.orderStatus) {
        const status = updated.orderStatus;

        if (status === "accepted" || status === "delivered") {
          showToast(`ORDER ${status.toUpperCase()}` , "success");
        } else if (status === "rejected" || status === "cancelled") {
          showToast(`ORDER ${status.toUpperCase()}` , "error");
        }
      }

      if (oldOrder.paymentStatus !== updated.paymentStatus) {
        if (updated.paymentStatus === "paid") {
          showToast(`आपकी आर्डर राशी पूर्ण रूप से जमा हुई` , "success");
        } else {
          showToast("आपकी आर्डर राशी अभी बाकी है " , "warning");
        }
      }
    });
  };

  /* ===============================
     INITIAL LOAD + POLLING
  ================================ */
  useEffect(() => {
    let intervalId;

    // initial fetch
    loadOrders(false);

    // start polling
    intervalId = setInterval(() => {
      loadOrders(true);
    }, POLL_INTERVAL);

    // cleanup (VERY IMPORTANT)
    return () => clearInterval(intervalId);
  }, []);

  /* ===============================
     FILTER LOGIC
  ================================ */
  const filteredOrders = orders.filter((o) => {
    if (filter === "all") return true;
    if (filter === "paymentPending") return o.paymentStatus === "pending";
    if (filter === "paymentPaid") return o.paymentStatus === "paid";
    return o.orderStatus === filter;
  });

  /* ===============================
     UI
  ================================ */
  return (
    <div className="fixed bg-white left-0 top-0 w-full h-screen z-100 p-4 pt-39 pb-5 overflow-y-auto">
      <div className="fixed bg-white top-0 left-0 w-full z-100 p-4 space-y-2">
        {/* <BackButton /> */}
        <p className="text-xs text-gray-500" onClick={()=>navigate("/order-place")}><ArrowLeft /></p>
        <MyOrdersHeader />
        <OrderFilterBar active={filter} onChange={setFilter} />
      </div>
      <div>
        {loading && <OrdersSkeleton />}
        {!loading && filteredOrders.length === 0 && <EmptyOrdersState />}
        {!loading && filteredOrders.length > 0 && (
          <OrdersList orders={filteredOrders} />
        )}
      </div>
    </div>
  );
};

export default MyOrders;
