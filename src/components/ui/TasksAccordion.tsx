'use client';

import {
  CheckCircle2,
  Circle,
  ChevronDown,
  Loader2,
  Flame,
  AlertTriangle,
  Minus,
  CalendarClock,
} from 'lucide-react';
import { useState } from 'react';

export type TaskPrioridade = 'urgente' | 'alta' | 'normal';

export type TaskItem = {
  id: number;
  titulo: string;
  concluida: boolean;
  prioridade: TaskPrioridade;
  storyPoints: number;
  dataExecucao?: string;
};

type Props = {
  titulo?: string;
  tasks: TaskItem[];
  onToggle: (task: TaskItem) => Promise<void> | void;
};

function prioridadeUI(prioridade: TaskPrioridade) {
  switch (prioridade) {
    case 'urgente':
      return {
        label: 'Urgente',
        class: 'bg-red-500/20 text-red-400 border-red-500/30',
        icon: Flame,
      };
    case 'alta':
      return {
        label: 'Alta',
        class: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        icon: AlertTriangle,
      };
    default:
      return {
        label: 'Normal',
        class: 'bg-zinc-700/40 text-zinc-300 border-zinc-600',
        icon: Minus,
      };
  }
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function TasksAccordion({
  titulo = 'Tarefas',
  tasks,
  onToggle,
}: Props) {
  const [open, setOpen] = useState(true);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  async function handleToggle(task: TaskItem) {
    setLoadingId(task.id);
    await onToggle(task);
    setLoadingId(null);
  }

  return (
    <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-8 py-6 text-left"
      >
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {titulo}
          </h2>
          <p className="text-sm text-zinc-400">
            {tasks.filter((t) => !t.concluida).length} pendentes
          </p>
        </div>

        <ChevronDown
          className={`h-6 w-6 transition ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-zinc-800 divide-y divide-zinc-800">
          {tasks.map((task) => {
            const prioridade = prioridadeUI(task.prioridade);
            const Icon = prioridade.icon;

            return (
              <button
                key={task.id}
                onClick={() => handleToggle(task)}
                disabled={loadingId === task.id}
                className="flex w-full items-start gap-6 px-8 py-5 text-left hover:bg-zinc-900 transition disabled:opacity-60"
              >
                {loadingId === task.id ? (
                  <Loader2 className="animate-spin text-zinc-400" size={22} />
                ) : task.concluida ? (
                  <CheckCircle2 className="text-emerald-400" size={22} />
                ) : (
                  <Circle className="text-zinc-500" size={22} />
                )}

                <div className="flex flex-1 flex-col gap-2">
                  <span
                    className={`text-base ${
                      task.concluida
                        ? 'line-through text-zinc-500'
                        : 'text-zinc-200'
                    }`}
                  >
                    {task.titulo}
                  </span>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 ${prioridade.class}`}
                    >
                      <Icon size={12} />
                      {prioridade.label}
                    </span>

                    <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-zinc-300">
                      {task.storyPoints} SP
                    </span>

                    {task.dataExecucao && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-zinc-300">
                        <CalendarClock size={12} />
                        {formatDateTime(task.dataExecucao)}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
