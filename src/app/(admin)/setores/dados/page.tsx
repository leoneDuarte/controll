'use client';

import {
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  GitBranch,
  Bug,
  CheckCircle2,
} from 'lucide-react';

const dashboardMock = {
  financeiro: {
    faturamentoMensal: 245000,
    crescimento: 12.4,
    despesas: 132000,
    lucro: 113000,
  },
  vendas: {
    vendasMes: 342,
    ticketMedio: 716,
    conversao: 4.8,
  },
  clientes: {
    ativos: 1280,
    novosMes: 94,
    churn: 1.9,
  },
  desenvolvimento: {
    repositorios: 18,
    commitsMes: 1240,
    bugsAbertos: 23,
    entregas: 14,
  },
};

function Card({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-white/10 p-5 flex gap-4 shadow">
      <div className="h-12 w-12 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
        {icon}
      </div>
      <div>
        <p className="text-sm text-zinc-400">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
        {subtitle && (
          <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default function EmpresaDashboardHome() {
  return (
    <div className="w-full flex flex-col gap-10">

      {/* FINANCEIRO */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Financeiro</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card
            title="Faturamento Mensal"
            value={`R$ ${dashboardMock.financeiro.faturamentoMensal.toLocaleString()}`}
            subtitle={`Crescimento ${dashboardMock.financeiro.crescimento}%`}
            icon={<DollarSign size={20} />}
          />
          <Card
            title="Despesas"
            value={`R$ ${dashboardMock.financeiro.despesas.toLocaleString()}`}
            icon={<CreditCard size={20} />}
          />
          <Card
            title="Lucro"
            value={`R$ ${dashboardMock.financeiro.lucro.toLocaleString()}`}
            icon={<TrendingUp size={20} />}
          />
        </div>
      </section>

      {/* VENDAS */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Vendas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card
            title="Vendas no mês"
            value={dashboardMock.vendas.vendasMes.toString()}
            icon={<TrendingUp size={20} />}
          />
          <Card
            title="Ticket médio"
            value={`R$ ${dashboardMock.vendas.ticketMedio}`}
            icon={<DollarSign size={20} />}
          />
          <Card
            title="Conversão"
            value={`${dashboardMock.vendas.conversao}%`}
            icon={<CheckCircle2 size={20} />}
          />
        </div>
      </section>

      {/* CLIENTES */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Clientes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card
            title="Clientes ativos"
            value={dashboardMock.clientes.ativos.toString()}
            icon={<Users size={20} />}
          />
          <Card
            title="Novos no mês"
            value={dashboardMock.clientes.novosMes.toString()}
            icon={<Users size={20} />}
          />
          <Card
            title="Churn"
            value={`${dashboardMock.clientes.churn}%`}
            icon={<TrendingUp size={20} />}
          />
        </div>
      </section>

      {/* DESENVOLVIMENTO */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Desenvolvimento</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card
            title="Repositórios"
            value={dashboardMock.desenvolvimento.repositorios.toString()}
            icon={<GitBranch size={20} />}
          />
          <Card
            title="Commits no mês"
            value={dashboardMock.desenvolvimento.commitsMes.toString()}
            icon={<GitBranch size={20} />}
          />
          <Card
            title="Bugs abertos"
            value={dashboardMock.desenvolvimento.bugsAbertos.toString()}
            icon={<Bug size={20} />}
          />
          <Card
            title="Entregas"
            value={dashboardMock.desenvolvimento.entregas.toString()}
            icon={<CheckCircle2 size={20} />}
          />
        </div>
      </section>
    </div>
  );
}
