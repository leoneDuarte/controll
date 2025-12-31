'use client';

import Link from 'next/link';

type ItemIA = {
  id: number;
  nome: string;
  descricao: string;
  quantidade: number;
  cor: string;
  rota: string;
  badge: string;
};

const iaMock: ItemIA[] = [
  {
    id: 1,
    nome: 'Agentes',
    descricao: 'Execução autônoma, filas e orquestração',
    quantidade: 14,
    badge: 'Core',
    cor: 'from-violet-500/20 via-fuchsia-500/10 to-transparent',
    rota: '/ia/agentes',
  },
  {
    id: 2,
    nome: 'Modelos',
    descricao: 'LLMs, embeddings e fine-tuning',
    quantidade: 8,
    badge: 'ML',
    cor: 'from-sky-500/20 via-blue-500/10 to-transparent',
    rota: '/ia/modelos',
  },
  {
    id: 3,
    nome: 'Empresas',
    descricao: 'Clientes, ambientes e consumo',
    quantidade: 22,
    badge: 'Org',
    cor: 'from-amber-500/20 via-orange-500/10 to-transparent',
    rota: '/ia/empresas',
  },
  {
    id: 4,
    nome: 'Chats',
    descricao: 'Sessões, históricos e contexto',
    quantidade: 156,
    badge: 'Live',
    cor: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    rota: '/ia/chats',
  },
];

export default function IAHome() {
  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">Plataforma de IA</h1>
        <p className="text-zinc-400 mt-2">
          Controle total de agentes, modelos e interações
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {iaMock.map((item) => (
          <Link
            key={item.id}
            href={item.rota}
            className="group relative rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-white transition hover:border-zinc-700 hover:shadow-2xl"
          >
            <div
              className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${item.cor} opacity-0 group-hover:opacity-100 transition`}
            />

            <div className="relative z-10 flex h-full flex-col gap-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    {item.nome}
                  </h2>
                  <span className="mt-1 inline-block rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
                    {item.badge}
                  </span>
                </div>          
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.descricao}
              </p>

              <div className="mt-auto flex items-center justify-between text-sm font-medium">
                <span className="text-zinc-400 group-hover:text-white transition">
                  Abrir módulo
                </span>
                <span className="translate-x-0 group-hover:translate-x-1 transition">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
