'use client';

import Link from 'next/link';
import { Github, GitBranch, GitPullRequest, Users, SquareKanban } from 'lucide-react';

type GitHubFeature = {
  id: number;
  titulo: string;
  descricao: string;
  icon: any;
  cor: string;
  rota: string;
};

const githubMock: GitHubFeature[] = [
  {
    id: 1,
    titulo: 'Dashboard',
    descricao: 'Relatórios e produtividade da equipe',
    icon: SquareKanban,
    cor: 'from-cyan-500 to-blue-600',
    rota: '/setores/tecnologia/desenvolvimento/github/dashboard',
  },
  {
    id: 2,
    titulo: 'Produtividade',
    descricao: 'Produtividade setor no github',
    icon: SquareKanban,
    cor: 'from-cyan-500 to-blue-600',
    rota: '/setores/tecnologia/desenvolvimento/github/produtividade',
  },
  {
    id: 3,
    titulo: 'Repositórios',
    descricao: 'Visualizar e gerenciar repositórios conectados',
    icon: Github,
    cor: 'from-zinc-700 to-zinc-900',
    rota: '/integracoes/github/repositorios',
  },
  {
    id: 4,
    titulo: 'Branches',
    descricao: 'Acompanhar branches e estratégias de versionamento',
    icon: GitBranch,
    cor: 'from-indigo-500 to-purple-600',
    rota: '/integracoes/github/branches',
  },
  {
    id: 5,
    titulo: 'Pull Requests',
    descricao: 'Revisões, status e histórico de PRs',
    icon: GitPullRequest,
    cor: 'from-emerald-500 to-green-600',
    rota: '/integracoes/github/pull-requests',
  },
  {
    id: 6,
    titulo: 'Colaboradores',
    descricao: 'Acessos, permissões e contribuições',
    icon: Users,
    cor: 'from-cyan-500 to-blue-600',
    rota: '/integracoes/github/colaboradores',
  }
];

export default function GitHubHome() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Github size={28} /> GitHub
        </h1>
        <p className="text-zinc-400">
          Integração da plataforma com o GitHub
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {githubMock.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.rota}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${item.cor}`}
              />

              <div className="relative z-10 flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold">{item.titulo}</h2>
                  <p className="text-sm opacity-80 mt-1">
                    {item.descricao}
                  </p>
                </div>

                <div className="mt-auto text-sm font-medium opacity-90">
                  Acessar →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
