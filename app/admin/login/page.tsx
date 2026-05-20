"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = () => {
    if (password === "admin123") {
      localStorage.setItem("admin", "true");
      router.push("/admin");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Admin Login 🔐</h1>

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", marginTop: "20px" }}
      />

      <br />

      <button
        onClick={login}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "black",
          color: "white",
        }}
      >
        Login
      </button>
    </div>
  );
}