"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const lineData = [
  { name: "Jan", value: 400 },
  { name: "Fev", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Abr", value: 200 },
  { name: "Mai", value: 700 },
];

const barData = [
  { name: "Produto A", value: 240 },
  { name: "Produto B", value: 456 },
  { name: "Produto C", value: 139 },
];

const pieData = [
  { name: "Ativo", value: 65 },
  { name: "Inativo", value: 35 },
];

const areaData = [
  { name: "Seg", value: 120 },
  { name: "Ter", value: 210 },
  { name: "Qua", value: 150 },
  { name: "Qui", value: 278 },
  { name: "Sex", value: 189 },
];

export default function DashboardGraficos() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="h-80 rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Linha</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-80 rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Barras</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-80 rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Pizza</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="h-80 rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Área</h2>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={areaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" strokeWidth={2} fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
