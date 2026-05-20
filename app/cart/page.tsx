"use client";

import { useCart } from "../context/CartContext";

type CartItem = {
  name: string;
  price: number;
};

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  // 💰 حساب المجموع
  const totalPrice = (cart as CartItem[]).reduce(
    (sum: number, item: CartItem) => {
      return sum + Number(item.price || 0);
    },
    0
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #9b2020, #5e0f0f)",
        padding: "40px",
        color: "#ffebe1",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "50px",
          marginBottom: "30px",
        }}
      >
        🛒 Your Cart
      </h1>

      {(cart as CartItem[]).length === 0 ? (
        <p>No items yet</p>
      ) : (
        <>
          {(cart as CartItem[]).map(
            (item: CartItem, index: number) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "20px",
                  margin: "15px auto",
                  width: "320px",
                  borderRadius: "18px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h3>{item.name}</h3>

                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "18px",
                  }}
                >
                  💰 {item.price}$
                </p>

                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    marginTop: "15px",
                    background: "#ffebe1",
                    color: "#9b2020",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Remove
                </button>
              </div>
            )
          )}

          {/* 💰 المجموع */}
          <h2 style={{ marginTop: "25px" }}>
            Total: {totalPrice}$
          </h2>

          {/* 🚀 Checkout */}
          <button
            onClick={() => {
              window.location.href = "/order";
            }}
            style={{
              marginTop: "25px",
              width: "320px",
              padding: "16px",
              borderRadius: "16px",
              border: "none",
              background: "#ffebe1",
              color: "#9b2020",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Checkout 🍪
          </button>
        </>
      )}
    </main>
  );
}