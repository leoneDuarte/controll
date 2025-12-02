"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// coloque aqui sua lógica real de login
function isLoggedIn() {
  return typeof window !== "undefined" && localStorage.getItem("token");
}

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const logged = isLoggedIn();

    if (!logged) {
      router.replace("/login");
    } else {
      router.replace("/dashboard"); // rota caso esteja logado
    }
  }, [router]);

  return null; // NENHUM HTML
}
