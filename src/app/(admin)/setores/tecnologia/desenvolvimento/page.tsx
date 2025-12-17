'use client';

type Area = {
  id: number;
  nome: string;
  descricao: string;
  stacks: number;
  cor: string;
  rota: string;
};

const areasMock: Area[] = [
   {
    id: 2,
    nome: 'Github',
    descricao: 'CI/CD, cloud e automações',
    stacks: 5,
    cor: 'from-rose-500 to-red-600',
    rota: '/setores/tecnologia/desenvolvimento/github',
  },
  {
    id: 1,
    nome: 'DevOps',
    descricao: 'CI/CD, cloud e automações',
    stacks: 5,
    cor: 'from-rose-500 to-red-600',
    rota: '/setores/tecnologia/desenvolvimento/devops',
  } 
];

import Link from 'next/link';

export default function DesenvolvimentoHome() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Desenvolvimento</h1>
    
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {areasMock.map((area) => (
          <Link
            key={area.id}
            href={area.rota}
            className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${area.cor}`}
            />

            <div className="relative z-10 flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{area.nome}</h2>
                <span className="text-sm opacity-70">
                  {area.stacks} stacks
                </span>
              </div>

              <p className="text-sm opacity-80">{area.descricao}</p>

              <div className="mt-auto text-sm font-medium opacity-90">
                Acessar área →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
