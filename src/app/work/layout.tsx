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
  User,
  Building,
  Microchip,
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
  { label: 'Empresa', icon: Building, href: '/setores' },
  { label: 'Tecnologia', icon: Microchip, href: '/setores/tecnologia' },
  { label: 'Acesso', icon: User, href: '/acesso' },
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
