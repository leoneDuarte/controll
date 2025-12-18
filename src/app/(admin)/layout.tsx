'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Home,
  Building2,
  Users,
  Github,
  BarChart3,
  Settings,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';

type SubMenuItem = {
  label: string;
  href: string;
};

type MenuItem = {
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: SubMenuItem[];
};

const MENU: MenuItem[] = [
  { label: 'Dashboard', icon: Home, href: '/dashboard' },
  {
    label: 'Empresa',
    icon: Building2,
    children: [
      { label: 'Visão geral', href: '/empresa' },
      { label: 'Setores', href: '/setores' },
    ],
  },
  {
    label: 'Tecnologia',
    icon: Users,
    children: [
      { label: 'GitHub', href: '/setores/tecnologia/desenvolvimento/github' }
    ],
  },
  { label: 'Relatórios', icon: BarChart3, href: '/relatorios' },
  { label: 'Configurações', icon: Settings, href: '/config' },
];

export default function EmpresaLayout({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const expanded = hovered || mobileOpen;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* OVERLAY MOBILE */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setOpenSub(null);
        }}
        className={clsx(
          'fixed inset-y-0 left-0 z-50 bg-zinc-900 border-r border-white/10',
          'transition-all duration-300 flex flex-col',
          expanded ? 'w-64' : 'w-16',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="h-16 flex items-center justify-center border-b border-white/10">
          <Menu size={18} />
        </div>

        <nav className="flex-1 p-2 flex flex-col gap-1">
          {MENU.map(item => {
            const Icon = item.icon;
            const isOpen = openSub === item.label;

            return (
              <div key={item.label}>
                <button
                  onClick={() => {
                    if (item.children) {
                      setOpenSub(isOpen ? null : item.label);
                    } else if (item.href) {
                      setMobileOpen(false);
                      window.location.href = item.href;
                    }
                  }}
                  className={clsx(
                    'group w-full h-12 rounded-xl flex items-center relative transition',
                    expanded
                      ? 'px-3 gap-3 justify-start'
                      : 'justify-center'
                  )}
                >
                  <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition" />

                  <div className="relative z-10 flex items-center justify-center h-9 w-9 rounded-lg bg-zinc-800">
                    <Icon size={16} />
                  </div>

                  {expanded && (
                    <span className="relative z-10 text-sm font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}

                  {expanded && item.children && (
                    <ChevronRight
                      size={14}
                      className={clsx(
                        'ml-auto transition-transform',
                        isOpen && 'rotate-90'
                      )}
                    />
                  )}
                </button>

                {expanded && item.children && isOpen && (
                  <div className="ml-12 mt-1 flex flex-col gap-1">
                    {item.children.map(sub => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* CONTENT */}
      <div className="lg:pl-16">
        <header className="lg:hidden h-16 flex items-center px-4 border-b border-white/10">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg bg-zinc-800"
          >
            <Menu size={20} />
          </button>
        </header>

        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
