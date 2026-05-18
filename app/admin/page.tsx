"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(savedOrders);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #9b2020, #5e0f0f)",
        padding: "40px",
        color: "#ffebe1",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        📊 Orders Dashboard
      </h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              background: "#ffebe1",
              color: "#9b2020",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "20px",
              maxWidth: "500px",
              marginInline: "auto",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>
              Order #{index + 1}
            </h2>

            <p>
              <strong>Customer:</strong> {order.customer}
            </p>

            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>

            <p>
              <strong>Date:</strong> {order.date}
            </p>

            <div style={{ marginTop: "15px" }}>
              <strong>Items:</strong>

              {order.items.map((item: any, i: number) => (
                <div
                  key={i}
                  style={{
                    marginTop: "10px",
                    padding: "10px",
                    background: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </main>
  );
}