import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 flex items-center justify-center">
      <Card className="w-full max-w-xl p-6 rounded-2xl bg-slate-800 shadow-xl">
        <CardContent className="space-y-6 text-center">
          <h1 className="text-3xl font-bold">Bem-vindo</h1>
          <p className="text-slate-300 text-sm">
            Esta é sua home. Simples, limpa e usando apenas shadcn/ui.
          </p>

          <div className="flex gap-3 justify-center">
            <Input placeholder="Buscar..." className="max-w-xs" />
            <Button>OK</Button>
          </div>

          <div className="pt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} — Home básica.
          </div>
        </CardContent>
      </Card>
    </main>
  );
}