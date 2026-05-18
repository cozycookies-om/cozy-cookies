"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function ProductsPage() {
  const { addToCart } = useCart();

  const products = [
    {
      name: "crunchy pudding cookies",
      desc: "scoop-kinder and pistachio-crunchy rice",
      price: "2.400 OMR",
      image: "/images/pudding.jpeg",
    },
    {
      name: "cookie cake",
      desc: "with creamy layers",
      price: "4.200 OMR",
      image: "/images/cake.jpeg",
    },
    {
      name: "Classic Cookies",
      desc: "one pc",
      price: "0.800 OMR",
      image: "/images/classic.jpeg",
    },
    {
      name: "hello kitty cake",
      desc: "filled with chocolate",
      price: "4.400 OMR",
      image: "/images/hello kity.jpeg",
    },
    {
      name: "pudding box",
      desc: "9 piece -2 sauce",
      price: "8.000 OMR",
      image: "/images/pudding box.jpeg",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #b12b2b 0%, #5c0b0b 40%, #220202 100%)",
        padding: "60px 25px",
        fontFamily: "sans-serif",
        color: "#ffebe1",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow Effects */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "rgba(255,235,225,0.08)",
          borderRadius: "50%",
          top: "-150px",
          right: "-100px",
          filter: "blur(90px)",
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

      {/* العنوان */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "70px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            marginBottom: "15px",
            fontWeight: "bold",
            letterSpacing: "2px",
            textShadow: "0 5px 20px rgba(0,0,0,0.35)",
          }}
        >
          🍪 Luxury Cookies
        </h1>

        <p
          style={{
            fontSize: "20px",
            opacity: 0.9,
            maxWidth: "700px",
            margin: "auto",
            lineHeight: "1.7",
          }}
        >
          Handcrafted premium cookies made with rich flavors,
          creamy fillings, and luxury ingredients.
        </p>
      </div>

      {/* المنتجات */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "35px",
          maxWidth: "1400px",
          margin: "auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {products.map((item, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "28px",
              overflow: "hidden",
              backdropFilter: "blur(18px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
              transition: "0.4s ease",
            }}
          >
            {/* الصورة */}
            <div
              style={{
                overflow: "hidden",
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={400}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  transition: "0.5s",
                }}
              />
            </div>

            {/* المحتوى */}
            <div
              style={{
                padding: "25px",
              }}
            >
              <h2
                style={{
                  fontSize: "30px",
                  marginBottom: "12px",
                  color: "#fff4ef",
                  textTransform: "capitalize",
                }}
              >
                {item.name}
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  opacity: 0.85,
                  lineHeight: "1.8",
                  marginBottom: "20px",
                }}
              >
                {item.desc}
              </p>

              {/* السعر */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "22px",
                }}
              >
                <h3
                  style={{
                    fontSize: "24px",
                    color: "#ffebe1",
                  }}
                >
                  {item.price}
                </h3>

                <span
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Premium
                </span>
              </div>

              {/* الزر */}
              <button
                onClick={() => addToCart(item)}
                style={{
                  width: "100%",
                  padding: "16px",
                  border: "none",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg, #ffebe1 0%, #ffffff 100%)",
                  color: "#7a1414",
                  fontWeight: "bold",
                  fontSize: "17px",
                  cursor: "pointer",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                  transition: "0.3s",
                }}
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}