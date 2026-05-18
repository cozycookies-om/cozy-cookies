"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function OrderPage() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const sendOrder = () => {
    // تجهيز المنتجات
    const cartItems = cart
      .map(
        (item: any, index: number) =>
          `${index + 1}. ${item.name} - ${item.price}`
      )
      .join("\n");

    // الرسالة
    const message = `New Order:

${cartItems}

Customer Name: ${name}
Quantity: ${quantity}`;

    // حفظ الطلبات للوحة التحكم
    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const newOrder = {
      customer: name,
      quantity,
      items: cart,
      date: new Date().toLocaleString(),
    };

    existingOrders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // نسخ الرسالة
    navigator.clipboard.writeText(message);

    // فتح إنستغرام
    window.open("https://ig.me/m/cozycookies.om", "_blank");

    alert("Order copied! Paste it in Instagram DM 📲");

    // تنظيف السلة
    clearCart();
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #9b2020, #5e0f0f)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffebe1",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "20px",
        }}
      >
        🧾 Checkout
      </h1>

      {/* عرض السلة */}
      <div
        style={{
          background: "#ffebe1",
          color: "#9b2020",
          padding: "20px",
          borderRadius: "15px",
          width: "300px",
          marginBottom: "20px",
          textAlign: "left",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>🛒 Your Cart</h3>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item: any, index: number) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "8px",
              }}
            >
              <strong>{item.name}</strong>
              <p>{item.price}</p>
            </div>
          ))
        )}
      </div>

      {/* الفورم */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "300px",
        }}
      >
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
        />

        <input
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
        />

        <button
          onClick={sendOrder}
          style={{
            padding: "12px",
            backgroundColor: "#ffebe1",
            color: "#9b2020",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit Order
        </button>
      </div>
    </main>
  );
}