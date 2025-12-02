"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Register() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = await fakeRegister(nome, email, senha);

    if (user.ok) {
      router.push("/empresa"); // volta pro login depois de registrar
    } else {
      alert("Erro ao criar conta");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <Card className="w-full max-w-sm bg-slate-800 text-white border-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Criar Conta</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="bg-slate-700 border-slate-600"
              />
            </div>

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
              Criar conta
            </Button>
          </form>

          {/* Links */}
          <div className="pt-4 flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-slate-400 hover:text-white text-xs transition-colors"
            >
              Já tem conta? Entrar
            </button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

// Mock simples — troque pela sua API real depois
async function fakeRegister(nome: string, email: string, senha: string) {
  await new Promise((r) => setTimeout(r, 500));

  if (nome && email && senha) {
    return { ok: true };
  }

  return { ok: true };
}
