'use client';

import { useEffect } from 'react';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

type NotificationPriority = 'baixa' | 'media' | 'alta';

type NotificationType = 'info' | 'sucesso' | 'alerta';

type NotificationProps = {
  titulo: string;
  mensagem: string;
  prioridade?: NotificationPriority;
  tipo?: NotificationType;
  emitirSom?: boolean;
  onClose?: () => void;
};

const prioridadeStyles: Record<NotificationPriority, string> = {
  baixa: 'border-zinc-700 bg-zinc-900',
  media: 'border-yellow-500/40 bg-yellow-500/10',
  alta: 'border-red-500/50 bg-red-500/10',
};

const tipoIcone: Record<NotificationType, any> = {
  info: Info,
  sucesso: CheckCircle,
  alerta: AlertTriangle,
};

export default function NotificationAlert({
  titulo,
  mensagem,
  prioridade = 'baixa',
  tipo = 'info',
  emitirSom = false,
  onClose,
}: NotificationProps) {
  const Icon = tipoIcone[tipo];

  useEffect(() => {
    if (!emitirSom) return;

    const audio = new Audio('/sounds/notification.mp3');
    audio.volume = prioridade === 'alta' ? 1 : 0.5;
    audio.play().catch(() => {});
  }, [emitirSom, prioridade]);

  return (
    <div
      className={`relative w-full rounded-2xl border p-4 text-white shadow-xl ${prioridadeStyles[prioridade]}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Icon size={20} />
        </div>

        <div className="flex-1">
          <h4 className="text-sm font-semibold">{titulo}</h4>
          <p className="mt-1 text-sm text-zinc-300">{mensagem}</p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition"
          >
            ✕
          </button>
        )}
      </div>

      {prioridade === 'alta' && (
        <span className="absolute right-4 top-4 text-[10px] uppercase tracking-wider text-red-400">
          Urgente
        </span>
      )}
    </div>
  );
}
