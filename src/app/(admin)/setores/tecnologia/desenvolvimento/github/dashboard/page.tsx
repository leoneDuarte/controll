'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
});

type GithubCommit = {
  _id: string;
  sha: string;
  email: string;
  login: string;
  adicoes: number;
  remocoes: number;
  total_alteracoes: number;
  autor: string;
  data: any;
};

function commitsPorDia(commits: GithubCommit[]) {
  const mapa = new Map<string, number>();
  commits.forEach(c => {
    const dia = new Date(c.data).toISOString().split('T')[0];
    mapa.set(dia, (mapa.get(dia) ?? 0) + 1);
  });
  return Array.from(mapa.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({ date, value }));
}

function alteracoesPorAutor(commits: GithubCommit[]) {
  const mapa = new Map<string, number>();
  commits.forEach(c => {
    const email = c.email || 'desconhecido';
    mapa.set(email, (mapa.get(email) ?? 0) + c.total_alteracoes);
  });
  return Array.from(mapa.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([email, value]) => ({ email, value }));
}

function adicoesVsRemocoes(commits: GithubCommit[]) {
  let adicoes = 0;
  let remocoes = 0;
  commits.forEach(c => {
    adicoes += c.adicoes;
    remocoes += c.remocoes;
  });
  return [
    { name: 'Adições', value: adicoes },
    { name: 'Remoções', value: remocoes },
  ];
}

function alteracoesPorDia(commits: GithubCommit[]) {
  const mapa = new Map<string, number>();
  commits.forEach(c => {
    const dia = new Date(c.data).toISOString().split('T')[0];
    mapa.set(dia, (mapa.get(dia) ?? 0) + c.total_alteracoes);
  });
  return Array.from(mapa.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({ date, value }));
}

async function getDataGithub(since: string, until: string) {
  const params = new URLSearchParams({ since, until });
  const res = await fetch(
    `/api/setor/desenvolvimento/github-commits?${params.toString()}`
  );
  return res.json();
}

const AXIS_COLOR = '#e5e7eb';
const GRID_COLOR = 'rgba(255,255,255,0.1)';

export default function DashboardGraficos() {
  const hoje = new Date().toISOString().split('T')[0];

  const [since, setSince] = useState(hoje);
  const [until, setUntil] = useState(hoje);

  const [commitsDia, setCommitsDia] = useState<any[]>([]);
  const [autorData, setAutorData] = useState<any[]>([]);
  const [pizzaData, setPizzaData] = useState<any[]>([]);
  const [areaData, setAreaData] = useState<any[]>([]);

  async function buscar() {
    const res = await getDataGithub(
      new Date(since).toISOString(),
      new Date(until).toISOString()
    );

    const commits = res.data;

    setCommitsDia(commitsPorDia(commits));
    setAutorData(alteracoesPorAutor(commits));
    setPizzaData(adicoesVsRemocoes(commits));
    setAreaData(alteracoesPorDia(commits));
  }

  const GRID = { left: 40, right: 20, top: 30, bottom: 40 };

  return (
    <div className="w-full grid grid-cols-1 gap-8 p-8">
      {/* Filtros */}
      <div className="rounded-2xl bg-zinc-900 border border-white/10 p-6 flex flex-wrap gap-6 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-400">De</label>
          <input
            type="date"
            value={since}
            onChange={e => setSince(e.target.value)}
            className="rounded-lg bg-zinc-800 border border-white/10 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-400">Até</label>
          <input
            type="date"
            value={until}
            onChange={e => setUntil(e.target.value)}
            className="rounded-lg bg-zinc-800 border border-white/10 px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={buscar}
          className="h-10 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition"
        >
          Aplicar filtros
        </button>
      </div>

      {[
        {
          title: 'Commits por dia',
          height: 420,
          option: {
            grid: GRID,
            tooltip: { trigger: 'axis' },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: commitsDia.map(d => d.date),
              axisLabel: { color: AXIS_COLOR },
              axisLine: { lineStyle: { color: GRID_COLOR } },
            },
            yAxis: {
              type: 'value',
              axisLabel: { color: AXIS_COLOR },
              splitLine: { lineStyle: { color: GRID_COLOR } },
            },
            series: [
              {
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: commitsDia.map(d => d.value),
              },
            ],
          },
        },
        {
          title: 'Alterações por autor',
          height: 420,
          option: {
            grid: GRID,
            tooltip: { trigger: 'axis' },
            xAxis: {
              type: 'category',
              data: autorData.map(d => d.email),
              axisLabel: { rotate: 30, color: AXIS_COLOR },
              axisLine: { lineStyle: { color: GRID_COLOR } },
            },
            yAxis: {
              type: 'value',
              axisLabel: { color: AXIS_COLOR },
              splitLine: { lineStyle: { color: GRID_COLOR } },
            },
            series: [{ type: 'bar', data: autorData.map(d => d.value) }],
          },
        },
        {
          title: 'Adições vs Remoções',
          height: 460,
          option: {
            tooltip: { trigger: 'item' },
            legend: {
              bottom: 0,
              textStyle: { color: AXIS_COLOR },
            },
            series: [{ type: 'pie', radius: '65%', data: pizzaData }],
          },
        },
        {
          title: 'Alterações por dia',
          height: 420,
          option: {
            grid: GRID,
            tooltip: { trigger: 'axis' },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: areaData.map(d => d.date),
              axisLabel: { color: AXIS_COLOR },
              axisLine: { lineStyle: { color: GRID_COLOR } },
            },
            yAxis: {
              type: 'value',
              axisLabel: { color: AXIS_COLOR },
              splitLine: { lineStyle: { color: GRID_COLOR } },
            },
            series: [
              {
                type: 'line',
                smooth: true,
                areaStyle: {},
                showSymbol: false,
                data: areaData.map(d => d.value),
              },
            ],
          },
        },
      ].map((card, i) => (
        <div
          key={i}
          className="rounded-2xl bg-zinc-900 border border-white/10 shadow-xl overflow-hidden"
          style={{ height: card.height }}
        >
          <h2 className="px-6 pt-5 text-lg font-semibold text-zinc-100">
            {card.title}
          </h2>
          <div className="h-[calc(100%-56px)]">
            <ReactECharts
              style={{ width: '100%', height: '100%' }}
              option={card.option}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
