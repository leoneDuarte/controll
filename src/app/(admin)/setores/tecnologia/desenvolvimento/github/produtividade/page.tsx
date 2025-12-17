'use client';

import { useState } from 'react';
import {
    GitCommit,
    GitBranch,
    TrendingUp,
    Trophy,
    Users,
    Calendar,
    Github,
} from 'lucide-react';

type ReportDia = {
    commits: number;
    alteracoes: number;
    repos: number;
    topDev: { nome: string; alteracoes: number };
    repositorios: { nome: string; commits: number }[];
    devs: { nome: string; commits: number; alteracoes: number }[];
};

const mockPorDia: Record<string, ReportDia> = {
    '2025-12-15': {
        commits: 34,
        alteracoes: 1430,
        repos: 3,
        topDev: { nome: 'Maria', alteracoes: 620 },
        repositorios: [
            { nome: 'erp-frontend', commits: 15 },
            { nome: 'erp-backend', commits: 12 },
            { nome: 'infra-scripts', commits: 7 },
        ],
        devs: [
            { nome: 'Maria', commits: 16, alteracoes: 620 },
            { nome: 'João', commits: 11, alteracoes: 420 },
            { nome: 'Carlos', commits: 7, alteracoes: 390 },
        ],
    },
};

export default function GithubProdutividadeResumo() {
    const hoje = '2025-12-15';

    const [data, setData] = useState(hoje);
    const [report, setReport] = useState<ReportDia | null>(
        mockPorDia[hoje] ?? null
    );

    function gerarRelatorio() {
        const resultado = mockPorDia[data] ?? null;
        setReport(resultado);
    }

    return (
        <div className="flex flex-col gap-10">
            {/* HEADER */}
            <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        <Github size={28} /> GitHub
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Produtividade do setor de desenvolvimento
                    </p>
                </div>

                <div className="flex items-end gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-400">Data</label>
                        <input
                            type="date"
                            value={data}
                            onChange={e => setData(e.target.value)}
                            className="h-10 rounded-xl bg-zinc-900 border border-white/10 px-3 text-sm"
                        />
                    </div>
                    <button
                        onClick={gerarRelatorio}
                        className="h-10 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-medium flex items-center gap-2 hover:opacity-90 transition"
                    >
                        <Calendar size={16} />
                        Gerar
                    </button>
                </div>
            </div>

            {report && (
                <>
                    {/* KPIs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                        <Kpi title="Commits" value={report.commits} icon={<GitCommit />} />
                        <Kpi
                            title="Alterações"
                            value={report.alteracoes}
                            icon={<TrendingUp />}
                        />
                        <Kpi
                            title="Repositórios ativos"
                            value={report.repos}
                            icon={<GitBranch />}
                        />
                        <Kpi
                            title="Top Dev"
                            value={report.topDev.nome}
                            subtitle={`${report.topDev.alteracoes} alterações`}
                            icon={<Trophy />}
                            highlight
                        />
                    </div>

                    {/* LISTAS */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {/* REPOS */}
                        <div className="rounded-2xl bg-zinc-900 border border-white/10 p-6">
                            <h2 className="font-semibold mb-4">
                                Repositórios alterados
                            </h2>
                            <div className="flex flex-col gap-3">
                                {report.repositorios.map(repo => (
                                    <div
                                        key={repo.nome}
                                        className="flex items-center justify-between rounded-xl bg-zinc-950 border border-white/5 px-4 py-3"
                                    >
                                        <span className="font-medium">{repo.nome}</span>
                                        <span className="text-sm text-zinc-400">
                                            {repo.commits} commits
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DEVS */}
                        <div className="rounded-2xl bg-zinc-900 border border-white/10 p-6">
                            <h2 className="font-semibold mb-4">
                                Desenvolvedores
                            </h2>
                            <div className="flex flex-col gap-3">
                                {report.devs.map(dev => (
                                    <div
                                        key={dev.nome}
                                        className="flex items-center justify-between rounded-xl bg-zinc-950 border border-white/5 px-4 py-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                                                <Users size={16} />
                                            </div>
                                            <span className="font-medium">{dev.nome}</span>
                                        </div>
                                        <span className="text-sm text-zinc-400">
                                            {dev.commits} commits · {dev.alteracoes} alt.
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function Kpi({
    title,
    value,
    subtitle,
    icon,
    highlight,
}: {
    title: string;
    value: any;
    subtitle?: string;
    icon: React.ReactNode;
    highlight?: boolean;
}) {
    return (
        <div
            className={`rounded-2xl border p-6 flex items-center gap-4 ${highlight
                    ? 'bg-gradient-to-br from-indigo-500/15 to-purple-600/15 border-indigo-500/30'
                    : 'bg-zinc-900 border-white/10'
                }`}
        >
            <div className="h-12 w-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <p className="text-sm text-zinc-400">{title}</p>
                <p className="text-2xl font-semibold leading-tight">
                    {value}
                </p>
                {subtitle && (
                    <p className="text-xs text-zinc-400">{subtitle}</p>
                )}
            </div>
        </div>
    );
}
