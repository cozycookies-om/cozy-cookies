"use client";

export default function SuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#1f1f1f,#14532d)",
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
          width: "450px",
        }}
      >
        <h1>✅ Order Successful</h1>

        <p style={{ marginTop: "20px" }}>
          Thank you for your order 🍪
        </p>

        <button
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            marginTop: "25px",
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            background: "#fff",
            color: "#14532d",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Back To Home
        </button>
      </div>
    </main>
  );
}