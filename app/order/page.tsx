"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";

type CartItem = {
  name: string;
  price: number;
};

export default function OrderPage() {
  const { cart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cash");

  // 💰 حساب السعر الكامل
  const totalPrice = (cart as CartItem[]).reduce(
    (sum: number, item: CartItem) => {
      return sum + Number(item.price || 0);
    },
    0
  );

  // 🚀 إرسال الطلب
  const sendOrder = async () => {
if (cart.length === 0) {
alert("Cart is empty");
return;
}

if (!name || !phone || !address) {
alert("Please fill all fields");
return;
}

const cartItems = (cart as CartItem[])
.map((item: CartItem) => item.name)
.join(", ");

const { error } = await supabase.from("orders").insert([
{
customer_name: name,
phone: phone,
address: address,
product_name: cartItems,
total_price: totalPrice.toString(),
payment_method: payment,
status: "pending",
},
]);

if (error) {
console.error(error);
alert(error.message);
return;
}

alert("Order sent successfully ✅");

if (payment === "card") {
window.location.href = "/checkout";
} else {
window.location.href = "/success";
}
};


  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #3b0606 0%, #7a1414 50%, #9b2020 100%)",
        padding: "40px 20px",
        color: "#ffebe1",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "rgba(255,255,255,0.08)",
          padding: "30px",
          borderRadius: "24px",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "42px",
          }}
        >
          🧾 Checkout
        </h1>

        {/* المنتجات */}
        <div style={{ marginBottom: "25px" }}>
          <h2 style={{ marginBottom: "15px" }}>Your Order:</h2>

          {(cart as CartItem[]).length === 0 ? (
            <p>No items in cart</p>
          ) : (
            (cart as CartItem[]).map(
              (item: CartItem, index: number) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    padding: "14px",
                    borderRadius: "14px",
                    marginBottom: "10px",
                  }}
                >
                  {item.name} — ${item.price}
                </div>
              )
            )
          )}

          {/* 💰 المجموع */}
          {(cart as CartItem[]).length > 0 && (
            <h3 style={{ marginTop: "15px" }}>
              Total: ${totalPrice}
            </h3>
          )}
        </div>

        {/* الاسم */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            marginBottom: "18px",
            fontSize: "16px",
          }}
        />

        {/* رقم الهاتف */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            marginBottom: "18px",
            fontSize: "16px",
          }}
        />

        {/* العنوان */}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            marginBottom: "18px",
            fontSize: "16px",
          }}
        />

        {/* الدفع */}
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            marginBottom: "22px",
            fontSize: "16px",
          }}
        >
          <option value="cash">Cash On Delivery</option>
          <option value="card">Card Payment</option>
        </select>

        {/* زر الطلب */}
        <button
          onClick={sendOrder}
          style={{
            width: "100%",
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
          Submit Order 🍪
        </button>
      </div>
    </main>
  );
}