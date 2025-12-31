'use client';

import { LucideIcon } from 'lucide-react';

type Skill = {
  id: number;
  nome: string;
  icon: LucideIcon;
};

type UserProgressProps = {
  nome: string;
  cargo: string;
  level: number;
  xpAtual: number;
  xpProximoLevel: number;
  skills: Skill[];
};

export default function UserProgressCard({
  nome,
  cargo,
  level,
  xpAtual,
  xpProximoLevel,
  skills,
}: UserProgressProps) {
  const progressoLevel = Math.min(
    (xpAtual / xpProximoLevel) * 100,
    100
  );

  return (
    <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{nome}</h2>
          <p className="text-sm text-zinc-400">{cargo}</p>
        </div>

        <div className="rounded-xl bg-indigo-500/20 px-3 py-1 text-sm font-semibold text-indigo-300">
          LVL {level}
        </div>
      </div>

      {/* XP */}
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-zinc-400">
          <span>XP</span>
          <span>
            {xpAtual} / {xpProximoLevel}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
            style={{ width: `${progressoLevel}%` }}
          />
        </div>
      </div>

      {/* Skills compactas */}
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <div
              key={skill.id}
              className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-300"
            >
              <Icon size={14} />
              <span>{skill.nome}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
