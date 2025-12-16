"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), {
  ssr: false,
});

/* =======================
   TIPOS
======================= */
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

/* =======================
   TRANSFORMADORES
======================= */
function commitsPorDia(commits: GithubCommit[]) {
  const mapa = new Map<string, number>();

  commits.forEach(c => {
    const dia = new Date(c.data).toISOString().split("T")[0];
    mapa.set(dia, (mapa.get(dia) ?? 0) + 1);
  });

  return Array.from(mapa.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({ date, value }));
}

function alteracoesPorAutor(commits: GithubCommit[]) {
  const mapa = new Map<string, number>();

  commits.forEach(c => {
    const email = c.email || "desconhecido";
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
    { name: "Adições", value: adicoes },
    { name: "Remoções", value: remocoes },
  ];
}

function alteracoesPorDia(commits: GithubCommit[]) {
  const mapa = new Map<string, number>();

  commits.forEach(c => {
    const dia = new Date(c.data).toISOString().split("T")[0];
    mapa.set(dia, (mapa.get(dia) ?? 0) + c.total_alteracoes);
  });

  return Array.from(mapa.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({ date, value }));
}

/* =======================
   API
======================= */
async function getDataGithub(since: string, until: string) {
  const params = new URLSearchParams({ since, until });
  const res = await fetch(
    `/api/setor/desenvolvimento/github-commits?${params.toString()}`
  );
  return res.json();
}

/* =======================
   COMPONENTE
======================= */
export default function DashboardGraficos() {
  const hoje = new Date().toISOString().split("T")[0];

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

  const GRID_COLADO = {
    left: 0,
    right: 0,
    top: 10,
    bottom: 30,
  };

  return (
    <div className="w-full grid grid-cols-1 gap-6 px-2">

      {/* FILTROS */}
      <div className="flex gap-4 items-end p-4 rounded-2xl shadow">
        <div>
          <label className="text-sm">De</label>
          <input
            type="date"
            value={since}
            onChange={e => setSince(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="text-sm">Até</label>
          <input
            type="date"
            value={until}
            onChange={e => setUntil(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        <button
          onClick={buscar}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Aplicar filtros
        </button>
      </div>

      {/* COMMITS POR DIA */}
      <div className="w-full h-[420px] rounded-2xl shadow">
        <h2 className="px-4 pt-4 text-lg font-semibold">Commits por dia</h2>
        <div className="w-full h-[360px]">
          <ReactECharts
            style={{ width: "100%", height: "100%" }}
            option={{
              grid: GRID_COLADO,
              tooltip: { trigger: "axis" },
              dataZoom: [{ type: "inside" }, { type: "slider", height: 20 }],
              xAxis: { type: "category", boundaryGap: false, data: commitsDia.map(d => d.date) },
              yAxis: { type: "value" },
              series: [{ type: "line", smooth: true, showSymbol: false, data: commitsDia.map(d => d.value) }],
            }}
          />
        </div>
      </div>

      {/* ALTERAÇÕES POR AUTOR */}
      <div className="w-full h-[420px] rounded-2xl shadow">
        <h2 className="px-4 pt-4 text-lg font-semibold">Alterações por autor</h2>
        <div className="w-full h-[360px]">
          <ReactECharts
            style={{ width: "100%", height: "100%" }}
            option={{
              grid: GRID_COLADO,
              tooltip: { trigger: "axis" },
              xAxis: { type: "category", data: autorData.map(d => d.email), axisLabel: { rotate: 30 } },
              yAxis: { type: "value" },
              series: [{ type: "bar", data: autorData.map(d => d.value) }],
            }}
          />
        </div>
      </div>

      {/* PIZZA */}
      <div className="w-full h-[460px] rounded-2xl shadow">
        <h2 className="px-4 pt-4 text-lg font-semibold">Adições vs Remoções</h2>
        <div className="w-full h-[400px]">
          <ReactECharts
            style={{ width: "100%", height: "100%" }}
            option={{
              grid: GRID_COLADO,
              tooltip: { trigger: "item" },
              legend: { bottom: 0 },
              series: [{ type: "pie", radius: "65%", data: pizzaData }],
            }}
          />
        </div>
      </div>

      {/* ALTERAÇÕES POR DIA */}
      <div className="w-full h-[420px] rounded-2xl shadow">
        <h2 className="px-4 pt-4 text-lg font-semibold">Alterações por dia</h2>
        <div className="w-full h-[360px]">
          <ReactECharts
            style={{ width: "100%", height: "100%" }}
            option={{
              grid: GRID_COLADO,
              tooltip: { trigger: "axis" },
              dataZoom: [{ type: "inside" }, { type: "slider", height: 20 }],
              xAxis: { type: "category", boundaryGap: false, data: areaData.map(d => d.date) },
              yAxis: { type: "value" },
              series: [{ type: "line", smooth: true, areaStyle: {}, showSymbol: false, data: areaData.map(d => d.value) }],
            }}
          />
        </div>
      </div>

    </div>
  );
}
