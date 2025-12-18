'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    User,
    Mail,
    Shield,
    ChevronLeft,
    ChevronRight,
    Plus,
} from 'lucide-react';

type Usuario = {
    _id: string;
    nome: string;
    email: string;
    role: string;
    status: 'ativo' | 'inativo';
};

const PAGE_SIZE = 8;

async function fetchUsuariosMock(): Promise<Usuario[]> {
    const response: any = await fetch('/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
    }

    const responseData: any = await response.json();

    return responseData.data;
}


export default function UsuariosListagem() {
    const router = useRouter();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [pagina, setPagina] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsuariosMock().then(data => {
            setUsuarios(data);
            setLoading(false);
        });
    }, []);

    const totalPaginas = Math.ceil(usuarios.length / PAGE_SIZE);
    const inicio = (pagina - 1) * PAGE_SIZE;
    const paginaAtual = usuarios.slice(inicio, inicio + PAGE_SIZE);

    return (
        <div className="p-8 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold">Usuários</h1>
                    <p className="text-sm text-zinc-400">
                        Gerenciamento e permissões de acesso
                    </p>
                </div>

                <button
                    onClick={() => router.push('/acesso/usuarios/novo')}
                    className="h-11 px-5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-medium flex items-center gap-2 self-start sm:self-auto"
                >
                    <Plus size={16} />
                    Adicionar usuário
                </button>
            </div>

            {/* Tabela */}
            <div className="rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-zinc-950 border-b border-white/10">
                        <tr className="text-left text-zinc-400">
                            <th className="px-6 py-4 font-medium">Usuário</th>
                            <th className="px-6 py-4 font-medium">E-mail</th>
                            <th className="px-6 py-4 font-medium">Perfil</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-6 py-12 text-center text-zinc-400"
                                >
                                    Carregando usuários...
                                </td>
                            </tr>
                        )}

                        {!loading &&
                            paginaAtual.map(user => (
                                <tr
                                    key={user._id}
                                    onClick={() =>
                                        router.push(`/acesso/usuarios/${user._id}`)
                                    }
                                    className="cursor-pointer border-t border-white/5 hover:bg-white/5 transition"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                                                <User size={16} />
                                            </div>
                                            <span className="font-medium">{user.nome}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-zinc-400">
                                        <div className="flex items-center gap-2">
                                            <Mail size={14} />
                                            {user.email}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Shield size={14} className="text-zinc-400" />
                                            {user.role}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'ativo'
                                                    ? 'bg-emerald-500/15 text-emerald-400'
                                                    : 'bg-rose-500/15 text-rose-400'
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">
                    Página {pagina} de {totalPaginas}
                </span>

                <div className="flex items-center gap-2">
                    <button
                        disabled={pagina === 1}
                        onClick={() => setPagina(p => p - 1)}
                        className="h-9 w-9 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center disabled:opacity-40"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <button
                        disabled={pagina === totalPaginas}
                        onClick={() => setPagina(p => p + 1)}
                        className="h-9 w-9 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center disabled:opacity-40"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
