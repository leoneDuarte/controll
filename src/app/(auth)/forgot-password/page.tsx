"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fakeSendEmail(email);

    if (res.ok) {
      alert("Se esse email existir, enviamos um link para recuperar a senha.");
      router.push("/login");
    } else {
      alert("Erro ao enviar email.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <Card className="w-full max-w-sm bg-slate-800 text-white border-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Recuperar Senha
          </CardTitle>
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

            <Button type="submit" className="w-full">
              Enviar link de recuperação
            </Button>
          </form>

          <div className="pt-4 flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-slate-400 hover:text-white text-xs transition-colors"
            >
              Voltar ao login
            </button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

// Mock — troque pela sua API real
async function fakeSendEmail(email: string) {
  await new Promise((r) => setTimeout(r, 500));

  if (email.includes("@")) {
    return { ok: true };
  }

  return { ok: false };
}
