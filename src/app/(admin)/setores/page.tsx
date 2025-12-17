'use client';

import Link from 'next/link';
import {
  Cpu,
  DollarSign,
  Users,
  TrendingUp,
  Headset,
  Building2,
} from 'lucide-react';

type Setor = {
  id: string;
  nome: string;
  descricao: string;
  rota: string;
  icon: any;
  gradient: string;
};

const setoresMock: Setor[] = [
  {
    id: 'tecnologia',
    nome: 'Tecnologia',
    descricao: 'Infraestrutura, sistemas e inovação',
    rota: '/setores/tecnologia',
    icon: Cpu,
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'financeiro',
    nome: 'Financeiro',
    descricao: 'Controle financeiro e faturamento',
    rota: '/setores/financeiro',
    icon: DollarSign,
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    id: 'rh',
    nome: 'Recursos Humanos',
    descricao: 'Pessoas, cultura e processos',
    rota: '/setores/rh',
    icon: Users,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'vendas',
    nome: 'Vendas',
    descricao: 'Comercial e crescimento',
    rota: '/setores/vendas',
    icon: TrendingUp,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'suporte',
    nome: 'Suporte',
    descricao: 'Atendimento ao cliente',
    rota: '/setores/suporte',
    icon: Headset,
    gradient: 'from-rose-500 to-red-600',
  },
  {
    id: 'administrativo',
    nome: 'Administrativo',
    descricao: 'Gestão interna e operações',
    rota: '/setores/administrativo',
    icon: Building2,
    gradient: 'from-zinc-500 to-zinc-700',
  },
];

export default function SetoresCards() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Setores</h1>
        <p className="text-zinc-400">Estrutura organizacional da empresa</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {setoresMock.map((setor) => {
          const Icon = setor.icon;

          return (
            <Link key={setor.id} href={setor.rota}>
              <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${setor.gradient}`}
                />

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs uppercase tracking-wider opacity-60">
                      {setor.id}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">{setor.nome}</h2>
                    <p className="text-sm opacity-80 mt-1">
                      {setor.descricao}
                    </p>
                  </div>

                  <div className="mt-auto text-sm font-medium opacity-90">
                    Acessar setor →
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
