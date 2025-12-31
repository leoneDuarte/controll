'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

type Projeto = {
  id: number;
  nome: string;
  descricao: string;
  status: 'ativo' | 'pausado' | 'finalizado';
  responsavel: string;
};

const projetosMock: Projeto[] = [
  {
    id: 1,
    nome: 'Plataforma Interna',
    descricao: 'Sistema interno de gestão da empresa',
    status: 'ativo',
    responsavel: 'João Silva',
  },
  {
    id: 2,
    nome: 'App Mobile',
    descricao: 'Aplicativo mobile para clientes',
    status: 'pausado',
    responsavel: 'Maria Souza',
  },
  {
    id: 3,
    nome: 'IA Atendimento',
    descricao: 'Automação de suporte com IA',
    status: 'finalizado',
    responsavel: 'Carlos Lima',
  },
  // adiciona mais se quiser
];

const PAGE_SIZE = 5;

function statusUI(status: Projeto['status']) {
  switch (status) {
    case 'ativo':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'pausado':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    default:
      return 'bg-zinc-700/40 text-zinc-300 border-zinc-600';
  }
}

export default function ProjectsListPage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(projetosMock.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const projetos = projetosMock.slice(start, start + PAGE_SIZE);

  return (
    <div className="p-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Projetos
          </h1>
          <p className="text-zinc-400 mt-1">
            Gerencie os projetos da empresa
          </p>
        </div>

        <Link
          href="/projetos/novo"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition"
        >
          <Plus size={16} />
          Criar projeto
        </Link>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
        <table className="w-full text-left">
          <thead className="bg-zinc-900 text-sm text-zinc-400">
            <tr>
              <th className="px-6 py-4">Projeto</th>
              <th className="px-6 py-4">Descrição</th>
              <th className="px-6 py-4">Responsável</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {projetos.map((projeto) => (
              <tr
                key={projeto.id}
                className="hover:bg-zinc-900 transition"
              >
                <td className="px-6 py-4 font-medium text-white">
                  <Link
                    href={`/projetos/${projeto.id}`}
                    className="hover:underline"
                  >
                    {projeto.nome}
                  </Link>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-400">
                  {projeto.descricao}
                </td>

                <td className="px-6 py-4 text-sm text-zinc-300">
                  {projeto.responsavel}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${statusUI(
                      projeto.status
                    )}`}
                  >
                    {projeto.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between text-sm text-zinc-400">
        <span>
          Página {page} de {totalPages}
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 disabled:opacity-40 hover:bg-zinc-800 transition"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 disabled:opacity-40 hover:bg-zinc-800 transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
