'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type DbCommit = {
  _id: string;
  sha: string;
  autor: string;
  email: string;
  mensagem: string;
  repo: string;
  url: string;
  data: string;
  adicoes: number;
  remocoes: number;
  total_alteracoes: number;
};

function todayDateInput() {
  return new Date().toISOString().slice(0, 10);
}

export function ControllGithubDbView() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [since, setSince] = useState(todayDateInput());
  const [until, setUntil] = useState(todayDateInput());
  const [message, setMessage] = useState<string | null>(null);

  const repoFull =
    owner.trim() && repo.trim() ? `${owner.trim()}/${repo.trim()}` : '';

  const commitsQuery = useQuery({
    queryKey: ['controll-commits', repoFull, since, until],
    enabled: !!repoFull,
    queryFn: async () => {
      const params = new URLSearchParams({
        repo: repoFull,
        since: new Date(since).toISOString(),
        until: new Date(until).toISOString()
      });
      const res = await fetch(`/api/controll/github/commits?${params}`);
      const json = (await res.json()) as
        | { ok: true; commits: DbCommit[] }
        | { error: string };
      if (!res.ok || !('ok' in json)) {
        throw new Error(
          'error' in json ? json.error : 'Falha ao buscar commits'
        );
      }
      return json.commits;
    }
  });

  const summary = useMemo(() => {
    const commits = commitsQuery.data ?? [];
    return {
      commits: commits.length,
      total: commits.reduce((acc, c) => acc + (c.total_alteracoes ?? 0), 0),
      adds: commits.reduce((acc, c) => acc + (c.adicoes ?? 0), 0),
      dels: commits.reduce((acc, c) => acc + (c.remocoes ?? 0), 0)
    };
  }, [commitsQuery.data]);

  async function importFromGithub() {
    setMessage(null);
    const res = await fetch('/api/controll/github/commits/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        owner: owner.trim(),
        repo: repo.trim(),
        since: new Date(since).toISOString(),
        until: new Date(until).toISOString(),
        max: 200
      })
    });

    const json = (await res.json()) as
      | { ok: true; fetched: number }
      | { error: string };
    if (!res.ok || !('ok' in json)) {
      setMessage('error' in json ? json.error : 'Falha ao importar');
      return;
    }
    setMessage(`Importado: ${json.fetched}`);
    await commitsQuery.refetch();
  }

  return (
    <div className='grid gap-6'>
      <Card>
        <CardHeader>
          <CardTitle>Importar commits (GitHub → Mongo)</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-4 md:grid-cols-2'>
          <div className='grid gap-2'>
            <Label>Owner</Label>
            <Input value={owner} onChange={(e) => setOwner(e.target.value)} />
          </div>
          <div className='grid gap-2'>
            <Label>Repo</Label>
            <Input value={repo} onChange={(e) => setRepo(e.target.value)} />
          </div>
          <div className='grid gap-2'>
            <Label>Since</Label>
            <Input
              type='date'
              value={since}
              onChange={(e) => setSince(e.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <Label>Until</Label>
            <Input
              type='date'
              value={until}
              onChange={(e) => setUntil(e.target.value)}
            />
          </div>
          <div className='flex items-center gap-3'>
            <Button
              type='button'
              onClick={importFromGithub}
              disabled={!repoFull}
            >
              Importar
            </Button>
            {message && (
              <span className='text-muted-foreground text-sm'>{message}</span>
            )}
          </div>
        </CardContent>
      </Card>

      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Commits</CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-semibold'>
            {summary.commits}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Changes</CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-semibold'>
            {summary.total}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Additions</CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-semibold'>
            {summary.adds}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Deletions</CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-semibold'>
            {summary.dels}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commits (DB)</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-2'>
          {commitsQuery.isLoading && <div>Carregando…</div>}
          {commitsQuery.isError && (
            <div className='text-destructive text-sm'>
              {commitsQuery.error.message}
            </div>
          )}
          {(commitsQuery.data ?? []).slice(0, 20).map((c) => (
            <a
              key={c._id}
              href={c.url}
              target='_blank'
              rel='noreferrer'
              className='hover:bg-muted/50 rounded-md border p-3 transition'
            >
              <div className='truncate text-sm font-medium'>{c.mensagem}</div>
              <div className='text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs'>
                <span>{c.sha.slice(0, 7)}</span>
                <span>{c.autor || c.email}</span>
                <span>{new Date(c.data).toLocaleString()}</span>
                <span>Δ {c.total_alteracoes}</span>
              </div>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
