"use client";

import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#1f1f1f,#3a0a0a)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          width: "400px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h1>💳 Checkout</h1>

        <h2 style={{ marginTop: "10px", fontSize: "16px" }}>
          Complete your order securely 🛍️
        </h2>

        <p style={{ marginTop: "20px", opacity: 0.8 }}>
          Payment system coming soon...
        </p>

        <button
          onClick={() => router.push("/success")}
          style={{
            marginTop: "25px",
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            background: "#ffebe1",
            color: "#9b2020",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          Pay Now 💳
        </button>

        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "12px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          Back to Shop 🛍️
        </button>
      </div>
    </main>
  );
}