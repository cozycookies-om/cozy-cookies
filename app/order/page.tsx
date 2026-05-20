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

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [payment, setPayment] = useState<string>("cash");
  const [quantity, setQuantity] = useState<string>("");

  // 💰 حساب السعر الإجمالي
  const totalPrice = (cart as CartItem[]).reduce(
    (sum: number, item: CartItem) => {
      return sum + Number(item.price || 0);
    },
    0
  );

  // 🚀 إرسال الطلب
  const sendOrder = async () => {
    if (!name || !phone || !address || !quantity) {
      alert("Please fill all fields");
      return;
    }

    if ((cart as CartItem[]).length === 0) {
      alert("Cart is empty");
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
        notes: notes,
        payment_method: payment,
        product_name: cartItems,
        quantity: Number(quantity),
        total_price: totalPrice,
        status: "pending",
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error sending order ❌");
    } else {
      if (payment === "card") {
  window.location.href = "/checkout";
} else {
  window.location.href = "/success";
}

      setName("");
      setPhone("");
      setAddress("");
      setNotes("");
      setQuantity("");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#3b0606 0%,#7a1414 50%,#9b2020 100%)",
        padding: "40px 20px",
        color: "#fff",
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
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          🧾 Complete Your Order
        </h1>

        {/* المنتجات */}
        <div style={{ marginBottom: "25px" }}>
          <h2>Your Order:</h2>

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
                  {item.name} — {item.price}$
                </div>
              )
            )
          )}

          <h3 style={{ marginTop: "15px" }}>
            💰 Total: {totalPrice}$
          </h3>
        </div>

        {/* الاسم */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        {/* الهاتف */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        {/* العنوان */}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={inputStyle}
        />

        {/* الكمية */}
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={inputStyle}
        />

        {/* طريقة الدفع */}
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          style={inputStyle}
        >
          <option value="cash">Cash On Delivery</option>
          <option value="card">Card</option>
        </select>

        {/* الملاحظات */}
        <textarea
          placeholder="Notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{
            ...inputStyle,
            height: "120px",
          }}
        />

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

// 🎨 تصميم الحقول
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  marginBottom: "18px",
  fontSize: "16px",
};