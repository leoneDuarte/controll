"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const auth = await authUser(email, senha);
    if (auth.ok) {
      router.push(auth.redirect);
    } else {
      alert("Login inválido");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <Card className="w-full max-w-sm bg-slate-800 text-white border-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700 border-slate-600"
              />
            </div>

            <div className="space-y-2">
              <Label>Senha</Label>
              <Input
                type="password"
                placeholder="••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="bg-slate-700 border-slate-600"
              />
            </div>

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          {/* LINKS BONITOS, DISCRETOS E BEM ESTILIZADOS */}
          <div className="pt-4 flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-slate-400 hover:text-white text-xs transition-colors"
            >
              Esqueci a senha
            </button>

            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-slate-400 hover:text-white text-xs transition-colors"
            >
              Criar conta
            </button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

// Mock — substitua pela sua API real
async function fakeAuth(email: string, senha: string) {
  await new Promise((r) => setTimeout(r, 500));

  if (email === "teste@teste.com" && senha === "123") {
    return {
      ok: true,
      user: {
        id: 1,
        nome: "Usuário Teste",
        email,
      },
    };
  }

  return { ok: false };
}

type AuthResponse =
  | {
      ok: true;
      user: {
        id: number;
        nome: string;
        email: string;
      };
      redirect: string;
      token: string;
    }
  | {
      ok: false;
      message?: string;
    };



export async function authUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    return {
      ok: true,
      user: {
        id: data.user.id,
        nome: data.user.nome,
        email: data.user.email,
      },
      redirect: data.redirect,
      token: data.token,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Erro ao conectar com o servidor",
    };
  }
}