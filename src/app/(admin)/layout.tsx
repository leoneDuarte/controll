'use client';

import '@/app/globals.css';
import { ReactNode, useState } from 'react';
import { Menu } from 'lucide-react';

export default function EmpresaLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-zinc-950 text-zinc-100">
      <div className="flex-1 flex flex-col">
        <header className="h-16 px-6 bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="text-sm text-zinc-400">Bem-vindo!</div>
        </header>
        <main className="flex-1 bg-zinc-950">
          {children}
        </main>
      </div>
    </div>
  );
}
