'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';

type Usuario = {
    id?: string;
    nome: string;
    email: string;
    role: string;
    status: 'ativo' | 'inativo';
    setor: string;
};

const setoresMock = [
    'Tecnologia',
    'Financeiro',
    'Recursos Humanos',
    'Vendas',
    'Suporte',
    'Administrativo',
];

function fetchUsuarioByIdMock(id: string): Promise<Usuario | null> {
    return new Promise(resolve => {
        setTimeout(() => {
            if (id === 'novo') return resolve(null);

            resolve({
                id,
                nome: `Usuário ${id}`,
                email: `usuario${id}@empresa.com`,
                role: Number(id) % 2 === 0 ? 'Admin' : 'Usuário',
                status: Number(id) % 3 === 0 ? 'inativo' : 'ativo',
                setor: setoresMock[Number(id) % setoresMock.length],
            });
        }, 400);
    });
}

export default function UsuarioForm() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const isEdit = id !== 'novo';

    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState<Usuario>({
        nome: '',
        email: '',
        role: 'Usuário',
        status: 'ativo',
        setor: '',
    });

    useEffect(() => {
        if (!isEdit) {
            setLoading(false);
            return;
        }

        fetchUsuarioByIdMock(id).then(data => {
            if (data) setUsuario(data);
            setLoading(false);
        });
    }, [id, isEdit]);

    function salvar() {
        console.log('SALVAR USUÁRIO', usuario);
        router.push('/usuarios');
    }

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center text-zinc-400">
                Carregando usuário...
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col">
            {/* Header */}
            <header className="h-16 px-6 flex items-center justify-between border-b border-white/10">
                <div>
                    <h1 className="text-xl font-semibold">
                        {isEdit ? 'Editar usuário' : 'Criar usuário'}
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Gestão de usuários e permissões
                    </p>
                </div>

                <button
                    onClick={() => router.back()}
                    className="h-10 px-4 rounded-xl bg-zinc-900 border border-white/10 flex items-center gap-2 text-sm"
                >
                    <ArrowLeft size={16} />
                    Voltar
                </button>
            </header>

            {/* Content */}
            <main className="flex-1 p-6 lg:p-12 flex justify-center">
                <div className="w-full max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl bg-zinc-900 border border-white/10 p-8">
                        <Field
                            label="Nome"
                            value={usuario.nome}
                            onChange={v => setUsuario({ ...usuario, nome: v })}
                        />

                        <Field
                            label="E-mail"
                            value={usuario.email}
                            onChange={v => setUsuario({ ...usuario, email: v })}
                        />

                        <SelectField
                            label="Perfil"
                            value={usuario.role}
                            options={['Usuário', 'Admin']}
                            onChange={v => setUsuario({ ...usuario, role: v })}
                        />

                        <SelectField
                            label="Status"
                            value={usuario.status}
                            options={['ativo', 'inativo']}
                            onChange={v =>
                                setUsuario({
                                    ...usuario,
                                    status: v as 'ativo' | 'inativo',
                                })
                            }
                        />

                        <SelectField
                            label="Setor"
                            value={usuario.setor}
                            options={setoresMock}
                            onChange={v => setUsuario({ ...usuario, setor: v })}
                        />
                    </div>

                    <div className="flex justify-end mt-8">
                        <button
                            onClick={salvar}
                            className="h-11 px-8 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-medium flex items-center gap-2"
                        >
                            <Save size={16} />
                            Salvar usuário
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-400">{label}</label>
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                className="h-11 rounded-xl bg-zinc-950 border border-white/10 px-4"
            />
        </div>
    );
}

function SelectField({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-400">{label}</label>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="h-11 rounded-xl bg-zinc-950 border border-white/10 px-4"
            >
                <option value="">Selecione</option>
                {options.map(o => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </div>
    );
}
