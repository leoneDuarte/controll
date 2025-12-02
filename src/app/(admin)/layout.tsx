"use client";

import "@/app/globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Building2,
  Users,
  Settings,
  Menu,
} from "lucide-react";
import { useState } from "react";

export default function EmpresaLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      {/* --- SIDEBAR MOBILE --- */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        className={cn(
          "fixed z-50 lg:static top-0 left-0 h-full w-64 bg-white border-r shadow-sm flex flex-col transition-transform",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">Painel da Empresa</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink icon={<Home size={18} />} label="Dashboard" href="/empresa" />
          <SidebarLink icon={<Building2 size={18} />} label="Dados da Empresa" href="/empresa/dados" />
          <SidebarLink icon={<Users size={18} />} label="Setores" href="/empresa/setores" />
          <SidebarLink icon={<Settings size={18} />} label="Configurações" href="/empresa/config" />
        </nav>

        <footer className="p-4 border-t text-xs text-muted-foreground">
          © {new Date().getFullYear()} — Seu Sistema
        </footer>
      </aside>

      {/* --- MAIN AREA --- */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm">
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu />
          </button>

          <h2 className="text-lg font-semibold">Configuração da Empresa</h2>

          <div className="text-sm text-muted-foreground">Bem-vindo!</div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>

        {/* FOOTER */}
        <footer className="h-14 border-t bg-white flex items-center justify-center text-sm text-muted-foreground">
          Desenvolvido com ❤️ por você mesmo
        </footer>
      </div>
    </div>
  );
}

function SidebarLink({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return (
    <a
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition"
      )}
      href={href}
    >
      {icon}
      {label}
    </a>
  );
}
