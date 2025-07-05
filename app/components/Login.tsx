"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/chat");
    } catch (error: any) {
      alert("Xatolik: " + error.message);
    }
  };

  // ✅ Google orqali login
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/chat");
    } catch (error: any) {
      alert("Google login xatoligi: " + error.message);
    }
  };

  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="h-20 w-20 mb-6">
        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
      </div>

      <h3 className="text-2xl font-semibold mb-2">ChatGPT Clone</h3>

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

      {/* ✅ Google login button */}
      <button
        onClick={loginWithGoogle}
        className="mt-6 px-4 py-2 border rounded-md text-black hover:bg-gray-100"
      >
        Google orqali kirish
      </button>
    </div>
  );
}
