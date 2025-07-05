"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/chat"); // Redirect after login/signup
    } catch (error: any) {
      alert("Xatolik: " + error.message);
    }
  };

  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="h-20 w-20 mb-6">
        {/* LOGO SVG yoki RASM */}
        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
      </div>
      <div className="mb-6">
        <h3 className="text-gray-900 text-2xl font-semibold">ChatGPT Clone’ga xush kelibsiz!</h3>
        <p className="text-sm text-gray-500">Email orqali tizimga kiring yoki roʻyxatdan oʻting.</p>
      </div>
      <form onSubmit={handleAuth} className="w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-3 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parol"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          {isLogin ? "Kirish" : "Roʻyxatdan oʻtish"}
        </button>
      </form>
      <p className="text-sm mt-4 text-gray-600">
        {isLogin ? "Akkauntingiz yoʻqmi?" : "Avval ro‘yxatdan o‘tganmisiz?"}{" "}
        <button
          className="text-blue-600 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Roʻyxatdan oʻting" : "Kirish"}
        </button>
      </p>
    </div>
  );
}
