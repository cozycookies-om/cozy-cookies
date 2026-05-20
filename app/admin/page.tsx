"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

type Order = {
  id: number;
  customer_name: string;
  product_name: string;
  quantity: number;
  total_price: number;
  status: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 حماية الأدمن
  useEffect(() => {
    const password = prompt("Enter Admin Password");

    if (password !== "2011") {
      alert("Wrong Password ❌");
      router.push("/");
    }
  }, []);

  // 🔥 جلب الطلبات
  const fetchOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log("FETCH ERROR:", error);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 تحديث الحالة
  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (!error) fetchOrders();
  };

  // 🔥 حذف الطلب
  const deleteOrder = async (id: number) => {
    const confirmDelete = confirm("Delete this order?");

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id);

    if (!error) fetchOrders();
  };

  // 🔥 الإحصائيات
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + Number(order.total_price || 0);
  }, 0);

  const pendingOrders = orders.filter(
    (o) => o.status === "pending"
  ).length;

  const preparingOrders = orders.filter(
    (o) => o.status === "preparing"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "delivered"
  ).length;

  // 🎨 شكل الكروت
  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.08)",
    padding: "15px",
    borderRadius: "15px",
    textAlign: "center",
    backdropFilter: "blur(10px)",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#1f1f1f,#3a0a0a)",
        color: "#fff",
        padding: "30px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "25px" }}>
        📦 Orders Admin Dashboard
      </h1>

      {/* 📊 الإحصائيات */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <div style={cardStyle}>
          📦 <h2>{totalOrders}</h2>
          <p>Total Orders</p>
        </div>

        <div style={cardStyle}>
          💰 <h2>{totalRevenue}$</h2>
          <p>Total Revenue</p>
        </div>

        <div style={cardStyle}>
          🟡 <h2>{pendingOrders}</h2>
          <p>Pending</p>
        </div>

        <div style={cardStyle}>
          🔵 <h2>{preparingOrders}</h2>
          <p>Preparing</p>
        </div>

        <div style={cardStyle}>
          🟢 <h2>{deliveredOrders}</h2>
          <p>Delivered</p>
        </div>
      </div>

      {/* 📦 الطلبات */}
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "15px",
              backdropFilter: "blur(10px)",
            }}
          >
            <p><b>👤 Name:</b> {order.customer_name}</p>

            <p><b>🍪 Product:</b> {order.product_name}</p>

            <p><b>🔢 Quantity:</b> {order.quantity}</p>

            <p><b>💰 Total:</b> {order.total_price}$</p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    order.status === "delivered"
                      ? "lightgreen"
                      : order.status === "preparing"
                      ? "skyblue"
                      : "orange",
                  fontWeight: "bold",
                }}
              >
                {order.status}
              </span>
            </p>

            {/* 🔄 تغيير الحالة */}
            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order.id, e.target.value)
              }
              style={{
                marginTop: "10px",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="delivered">Delivered</option>
            </select>

            {/* 🗑 حذف الطلب */}
            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() => deleteOrder(order.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Delete Order
              </button>
            </div>
          </div>
        ))
      )}
    </main>
  );
}