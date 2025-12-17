'use client';

import '@/app/globals.css';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Home,
  Building2,
  Users,
  Settings,
  Menu,
  Github,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

const atalhosMock = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: '/setores/tecnologia/desenvolvimento/github',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: '/relatorios',
    label: 'Relatórios',
    icon: BarChart3,
  },
  {
    href: '/config',
    label: 'Config',
    icon: Settings,
  },
];

export default function EmpresaLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <main className="flex-1 bg-zinc-950">
      {children}
    </main>
  );
}

function HeaderShortcut({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-zinc-300 bg-zinc-900 border border-white/10 hover:text-white hover:border-indigo-500/40 transition"
    >
      <span className="text-zinc-400 group-hover:text-white transition">
        {icon}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
