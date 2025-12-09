"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  // Dados mockados — substitua quando tiver API
  const data = [
    { name: "Jan", valor: 120 },
    { name: "Fev", valor: 190 },
    { name: "Mar", valor: 150 },
    { name: "Abr", valor: 210 },
    { name: "Mai", valor: 160 },
    { name: "Jun", valor: 250 },
  ];

  return (
    <main className="min-h-screen p-6 bg-slate-100 flex flex-col gap-6">

      {/* TÍTULO */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Atualizar</Button>
      </div>

      {/* GRID DE MÉTRICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <Card>
          <CardHeader>
            <CardTitle>Receita</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">R$ 12.450</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clientes ativos</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">87</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tickets hoje</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">34</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crescimento</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <span className="text-3xl font-bold">+12%</span>
            <Badge variant="secondary">mensal</Badge>
          </CardContent>
        </Card>

      </div>

      {/* GRÁFICO */}
      <Card className="w-full h-[380px]">
        <CardHeader>
          <CardTitle>Evolução Financeira</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valor" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </main>
  );
}
