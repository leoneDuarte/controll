'use client';

import Link from 'next/link';

type Setor = {
  id: number;
  nome: string;
  descricao: string;
  colaboradores: number;
  cor: string;
  rota: string;
};

const setoresMock: Setor[] = [
  {
    id: 1,
    nome: 'Desenvolvimento',
    descricao: 'Produtos, sistemas e integrações',
    colaboradores: 12,
    cor: 'from-indigo-500 to-purple-600',
    rota: '/setores/tecnologia/desenvolvimento',
  },
  {
    id: 2,
    nome: 'Infraestrutura',
    descricao: 'Cloud, redes e disponibilidade',
    colaboradores: 5,
    cor: 'from-cyan-500 to-blue-600',
    rota: '/setores/tecnologia/infraestrutura',
  },
  {
    id: 3,
    nome: 'Segurança',
    descricao: 'Compliance, auditoria e proteção',
    colaboradores: 3,
    cor: 'from-rose-500 to-red-600',
    rota: '/setores/tecnologia/seguranca',
  },
  {
    id: 4,
    nome: 'Suporte',
    descricao: 'Incidentes e atendimento interno',
    colaboradores: 7,
    cor: 'from-emerald-500 to-green-600',
    rota: '/setores/tecnologia/suporte',
  },
];

export default function TecnologiaHome() {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {setoresMock.map((setor) => (
          <Link
            key={setor.id}
            href={setor.rota}
            className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${setor.cor}`}
            />

            <div className="relative z-10 flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{setor.nome}</h2>
                <span className="text-sm opacity-70">
                  {setor.colaboradores} pessoas
                </span>
              </div>

              <p className="text-sm opacity-80">{setor.descricao}</p>

              <div className="mt-auto text-sm font-medium opacity-90">
                Ver setor →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
