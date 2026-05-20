"use client";

export default function CheckoutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#1f1f1f,#3a0a0a)",
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
        }}
      >
        <h1>💳 Checkout</h1>

        <p style={{ marginTop: "20px" }}>
          Payment system coming soon...
        </p>

        <button
          onClick={() => {
            window.location.href = "/success";
          }}
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
          }}
        >
          Pay Now
        </button>
      </div>
    </main>
  );
}