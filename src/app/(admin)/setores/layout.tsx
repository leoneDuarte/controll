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
        href: '/setores/dados',
        label: 'Dashboard',
        icon: Home,
    },
    {
        href: '/projetos',
        label: 'Projetos',
        icon: Settings,
    },
    {
        href: '/setores',
        label: 'Setores',
        icon: Users,
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
        <div className="flex min-h-screen w-full bg-zinc-950 text-zinc-100">
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity',
                    open ? 'opacity-100' : 'pointer-events-none opacity-0'
                )}
                onClick={() => setOpen(false)}
            />

            <div className="flex-1 flex flex-col">
                <header className="flex items-center h-16 px-6 border-b border-white/10 bg-zinc-950">
                    <div className="flex items-center gap-2">
                        {atalhosMock.map(item => {
                            const Icon = item.icon;
                            return (
                                <HeaderShortcut
                                    key={item.href}
                                    href={item.href}
                                    label={item.label}
                                    icon={<Icon size={16} />}
                                />
                            );
                        })}
                    </div>

                    <div className="flex-1" />

                    <button
                        onClick={() => setOpen(true)}
                        className="lg:hidden p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
                    >
                        <Menu size={20} />
                    </button>
                </header>

                <main className="flex-1 p-6 lg:p-10 bg-zinc-950">
                    {children}
                </main>
            </div>
        </div>
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
