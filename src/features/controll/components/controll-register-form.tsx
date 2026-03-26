'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function ControllRegisterForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/controll/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const json = (await res.json()) as { ok: true } | { error: string };

      if (!res.ok || !('ok' in json)) {
        throw new Error('error' in json ? json.error : 'Falha ao registrar');
      }

      router.push('/controll/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao registrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className='flex min-h-screen items-center justify-center p-6'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-center text-2xl'>Criar Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className='space-y-5'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Nome</Label>
              <Input
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Senha</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className='text-destructive text-sm'>{error}</div>}
            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Criando…' : 'Criar conta'}
            </Button>
          </form>
          <div className='flex flex-col items-center gap-1 pt-4'>
            <button
              type='button'
              onClick={() => router.push('/controll/login')}
              className='text-muted-foreground hover:text-foreground text-xs transition-colors'
            >
              Já tem conta? Entrar
            </button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
