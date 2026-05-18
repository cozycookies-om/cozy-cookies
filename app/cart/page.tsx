"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #9b2020, #5e0f0f)",
        padding: "40px",
        color: "#ffebe1",
        textAlign: "center",
      }}
    >
      <h1>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items yet</p>
      ) : (
        cart.map((item: any, index: number) => (
          <div
            key={index}
            style={{
              background: "#ffebe1",
              color: "#9b2020",
              padding: "15px",
              margin: "10px auto",
              width: "250px",
              borderRadius: "10px",
            }}
          >
            <h3>{item.name}</h3>
            <p>{item.price}</p>

            <button
              onClick={() => removeFromCart(index)}
              style={{
                marginTop: "10px",
                background: "#9b2020",
                color: "#ffebe1",
                border: "none",
                padding: "8px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <br />

      <Link href="/order">
        <button
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            background: "#ffebe1",
            color: "#9b2020",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Checkout 🧾
        </button>
      </Link>
    </main>
  );
}