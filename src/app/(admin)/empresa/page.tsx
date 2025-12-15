"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, DollarSign, Users, TrendingUp, Headset, Building2 } from "lucide-react";

const setoresMock = [
  {
    id: "tecnologia",
    nome: "Tecnologia",
    descricao: "Infraestrutura, sistemas e inovação",
    rota: "/setores/tecnologia",
    icon: Cpu,
  },
  {
    id: "financeiro",
    nome: "Financeiro",
    descricao: "Controle financeiro e faturamento",
    rota: "/setores/financeiro",
    icon: DollarSign,
  },
  {
    id: "rh",
    nome: "Recursos Humanos",
    descricao: "Pessoas, cultura e processos",
    rota: "/setores/rh",
    icon: Users,
  },
  {
    id: "vendas",
    nome: "Vendas",
    descricao: "Comercial e crescimento",
    rota: "/setores/vendas",
    icon: TrendingUp,
  },
  {
    id: "suporte",
    nome: "Suporte",
    descricao: "Atendimento ao cliente",
    rota: "/setores/suporte",
    icon: Headset,
  },
  {
    id: "administrativo",
    nome: "Administrativo",
    descricao: "Gestão interna e operações",
    rota: "/setores/administrativo",
    icon: Building2,
  },
];

export default function SetoresCardsMock() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Setores da Empresa</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {setoresMock.map((setor) => {
          const Icon = setor.icon;

          return (
            <Link key={setor.id} href={setor.rota} className="group">
              <Card className="h-full rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {setor.nome}
                      </h2>
                      <Badge variant="secondary">{setor.id}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mt-1">
                      {setor.descricao}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
