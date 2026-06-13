"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.log(error);
    } else {
      setProducts(data || []);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #3b0606 0%, #7a1414 50%, #9b2020 100%)",
        padding: "50px 20px",
        color: "#ffebe1",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          fontSize: "52px",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        🍪 Our Cookies
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: "24px",
              overflow: "hidden",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-8px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px 18px" }}>
              <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
                {product.name}
              </h2>

              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#ffe7dc",
                  marginBottom: "15px",
                }}
              >
                {new Intl.NumberFormat("en-OM", {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                }).format(product.price)}{" "}
                RO
              </p>

              <button
                onClick={() => addToCart(product)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#ffebe1",
                  color: "#9b2020",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.opacity = "0.85")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.opacity = "1")
                }
              >
                Add To Cart 🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}