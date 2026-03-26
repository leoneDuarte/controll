'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type UserRow = {
  _id: string;
  nome: string;
  email: string;
  role?: string;
  ativo?: boolean;
};

export function ControllUsersView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ['controll-users'],
    queryFn: async () => {
      const res = await fetch('/api/controll/users');
      const json = (await res.json()) as
        | { ok: true; users: UserRow[] }
        | { error: string };
      if (!res.ok || !('ok' in json)) {
        throw new Error(
          'error' in json ? json.error : 'Falha ao buscar usuários'
        );
      }
      return json.users;
    }
  });

  async function createUser() {
    setMessage(null);
    const res = await fetch('/api/controll/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const json = (await res.json()) as { ok: true } | { error: string };
    if (!res.ok || !('ok' in json)) {
      setMessage('error' in json ? json.error : 'Falha ao criar usuário');
      return;
    }
    setName('');
    setEmail('');
    setPassword('');
    setMessage('Usuário criado');
    await query.refetch();
  }

  return (
    <div className='grid gap-6'>
      <Card>
        <CardHeader>
          <CardTitle>Novo usuário</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-4 md:grid-cols-3'>
          <div className='grid gap-2'>
            <Label>Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='grid gap-2'>
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='grid gap-2'>
            <Label>Senha</Label>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex items-center gap-3 md:col-span-3'>
            <Button
              type='button'
              onClick={createUser}
              disabled={!name || !email || password.length < 6}
            >
              Criar
            </Button>
            {message && (
              <span className='text-muted-foreground text-sm'>{message}</span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-2'>
          {query.isLoading && <div>Carregando…</div>}
          {query.isError && (
            <div className='text-destructive text-sm'>
              {query.error.message}
            </div>
          )}
          {(query.data ?? []).map((u) => (
            <div
              key={u._id}
              className='flex items-center justify-between rounded-md border p-3'
            >
              <div className='min-w-0'>
                <div className='truncate text-sm font-medium'>{u.nome}</div>
                <div className='text-muted-foreground truncate text-xs'>
                  {u.email}
                </div>
              </div>
              <div className='text-muted-foreground text-xs'>
                {u.role ?? 'user'}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
