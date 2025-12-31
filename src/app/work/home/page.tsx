'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  Sword,
  Shield,
} from 'lucide-react';

import UserProgressCard from '@/components/ui/UserProgressCard';
import NotificationAlert from '@/components/ui/NotificationAlert';
import TasksAccordion from '@/components/ui/TasksAccordion';

type FuncionarioHomeItem = {
  id: number;
  nome: string;
  descricao: string;
  destaque?: string;
  cor: string;
  rota: string;
};

type Prioridade = 'urgente' | 'alta' | 'normal';

type TaskDoDia = {
  id: number;
  titulo: string;
  concluida: boolean;
  prioridade: Prioridade;
  storyPoints: number;
  dataExecucao?: string;
};

const funcionarioHomeMock: FuncionarioHomeItem[] = [
  {
    id: 1,
    nome: 'Minhas Tarefas',
    descricao: 'Atividades pendentes, em andamento e concluídas',
    destaque: 'Hoje',
    cor: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    rota: '/funcionario/tarefas',
  },
  {
    id: 2,
    nome: 'Registrar Atividade',
    descricao: 'Lançar horas, tarefas e entregas realizadas',
    destaque: 'Ação rápida',
    cor: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    rota: '/funcionario/atividades',
  },
  {
    id: 3,
    nome: 'Pagamentos',
    descricao: 'Salários, comissões e histórico financeiro',
    cor: 'from-emerald-500/20 via-green-500/10 to-transparent',
    rota: '/funcionario/pagamentos',
  },
  {
    id: 4,
    nome: 'Desempenho',
    descricao: 'Metas, avaliações e indicadores individuais',
    cor: 'from-pink-500/20 via-purple-500/10 to-transparent',
    rota: '/funcionario/desempenho',
  },
];

const tasksHojeMock: TaskDoDia[] = [
  {
    id: 1,
    titulo: 'Corrigir bug crítico em produção',
    concluida: false,
    prioridade: 'urgente',
    storyPoints: 8,
    dataExecucao: '2025-09-01T09:00:00',
  },
  {
    id: 2,
    titulo: 'Daily com o time',
    concluida: true,
    prioridade: 'normal',
    storyPoints: 1,
    dataExecucao: '2025-09-01T10:00:00',
  },
  {
    id: 3,
    titulo: 'Implementar ajuste no dashboard',
    concluida: false,
    prioridade: 'alta',
    storyPoints: 5,
  },
  {
    id: 4,
    titulo: 'Registrar horas do dia',
    concluida: false,
    prioridade: 'normal',
    storyPoints: 2,
    dataExecucao: '2025-09-01T18:00:00',
  },
];

export default function FuncionarioHome() {
  const [tasks, setTasks] = useState<TaskDoDia[]>(tasksHojeMock);

  async function toggleTask(task: TaskDoDia) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, concluida: !t.concluida } : t
      )
    );

    try {
      await fetch('/api/funcionario/tarefas/concluir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: task.id,
          concluida: !task.concluida,
        }),
      });
    } catch {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, concluida: task.concluida } : t
        )
      );
    }
  }

  return (
    <div className="p-10 space-y-14">
      <NotificationAlert
        titulo="Reunião em 10 minutos"
        mensagem="Você tem uma reunião com o time de produto às 15:30."
        prioridade="alta"
        tipo="alerta"
        emitirSom
      />

      {/* TASKS (USANDO O COMPONENTE, SÓ ISSO) */}
      <TasksAccordion
        tasks={tasks}
        titulo="Tarefas de hoje"
        onToggle={toggleTask}
      />

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {funcionarioHomeMock.map((item) => (
          <Link
            key={item.id}
            href={item.rota}
            className="group relative flex h-[220px] flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-white transition hover:border-zinc-700 hover:shadow-2xl"
          >
            <div
              className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${item.cor} opacity-0 group-hover:opacity-100 transition`}
            />

            <div className="relative z-10 flex h-full flex-col gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  {item.nome}
                </h2>
                {item.destaque && (
                  <span className="mt-1 inline-block rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
                    {item.destaque}
                  </span>
                )}
              </div>

              <p className="text-sm text-zinc-400 line-clamp-3">
                {item.descricao}
              </p>

              <div className="mt-auto text-sm font-medium">
                Acessar →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
