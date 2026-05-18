"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #3b0606 0%, #7a1414 50%, #9b2020 100%)",
        color: "#ffebe1",
        overflow: "hidden",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      {/* Glow خلفية */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "rgba(255,235,225,0.08)",
          borderRadius: "50%",
          top: "-150px",
          right: "-100px",
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
          bottom: "-100px",
          left: "-100px",
          filter: "blur(90px)",
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "25px 50px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          🍪 Cozy Cookies
        </h1>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link
            href="/products"
            style={{
              color: "#ffebe1",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Products
          </Link>

          <Link
            href="/cart"
            style={{
              color: "#ffebe1",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Cart 🛒
          </Link>

          <Link
            href="/admin"
            style={{
              color: "#ffebe1",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "80vh",
          position: "relative",
          zIndex: 2,
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "80px",
            fontWeight: "bold",
            marginBottom: "20px",
            lineHeight: "1",
          }}
        >
          Cozy Cookies
        </h1>

        <p
          style={{
            fontSize: "22px",
            maxWidth: "650px",
            opacity: 0.9,
            marginBottom: "40px",
            lineHeight: "1.6",
          }}
        >
          Made by Aseel ,Joy you can feel
        </p>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/products">
            <button
              style={{
                padding: "16px 35px",
                borderRadius: "14px",
                border: "none",
                background: "#ffebe1",
                color: "#9b2020",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              Order Now
            </button>
          </Link>

          <Link href="/cart">
            <button
              style={{
                padding: "16px 35px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "transparent",
                color: "#ffebe1",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              View Cart
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}