'use client';

import Link from 'next/link';
import {
  Users,
  UserCog,
  ShieldCheck,
  KeyRound,
  Layers,
} from 'lucide-react';

type ModuloAcesso = {
  id: string;
  nome: string;
  descricao: string;
  rota: string;
  icon: React.ElementType;
  gradient: string;
};

const modulosAcessoMock: ModuloAcesso[] = [
  {
    id: 'usuarios',
    nome: 'Usuários',
    descricao: 'Gerencie contas, status e dados de acesso',
    rota: '/acesso/usuarios',
    icon: Users,
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'grupos',
    nome: 'Grupos',
    descricao: 'Organização de usuários por função',
    rota: '/acessos/grupos',
    icon: Layers,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'permissoes',
    nome: 'Permissões',
    descricao: 'Controle fino de acessos e ações',
    rota: '/acessos/permissoes',
    icon: KeyRound,
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    id: 'roles',
    nome: 'Papéis (Roles)',
    descricao: 'Perfis de acesso reutilizáveis',
    rota: '/acessos/roles',
    icon: ShieldCheck,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'auditoria',
    nome: 'Auditoria',
    descricao: 'Histórico e rastreabilidade de acessos',
    rota: '/acessos/auditoria',
    icon: UserCog,
    gradient: 'from-rose-500 to-red-600',
  },
];

export default function ModulosAcessoCards() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Controle de Acessos
        </h1>
        <p className="text-zinc-400">
          Gerenciamento de usuários, permissões e segurança
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {modulosAcessoMock.map(modulo => {
          const Icon = modulo.icon;

          return (
            <Link key={modulo.id} href={modulo.rota}>
              <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${modulo.gradient}`}
                />

                <div className="relative z-10 flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs uppercase tracking-wider opacity-60">
                      {modulo.id}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      {modulo.nome}
                    </h2>
                    <p className="text-sm opacity-80 mt-1">
                      {modulo.descricao}
                    </p>
                  </div>

                  <div className="mt-auto text-sm font-medium opacity-90">
                    Gerenciar módulo →
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
