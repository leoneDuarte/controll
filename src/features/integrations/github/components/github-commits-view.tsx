'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

type GithubCommit = {
  sha: string;
  repo: string;
  url: string;
  message: string;
  authorName: string | null;
  authorEmail: string | null;
  date: string;
  additions: number | null;
  deletions: number | null;
  totalChanges: number | null;
};

function todayDateInput() {
  return new Date().toISOString().slice(0, 10);
}

export function GithubCommitsView() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [since, setSince] = useState(todayDateInput());
  const [until, setUntil] = useState(todayDateInput());
  const [includeStats, setIncludeStats] = useState(true);
  const [submitted, setSubmitted] = useState<{
    owner: string;
    repo: string;
    since: string;
    until: string;
    includeStats: boolean;
  } | null>(null);

  const query = useQuery({
    queryKey: ['github-commits', submitted],
    enabled: !!submitted,
    queryFn: async () => {
      const params = new URLSearchParams({
        owner: submitted!.owner,
        repo: submitted!.repo,
        since: new Date(submitted!.since).toISOString(),
        until: new Date(submitted!.until).toISOString(),
        includeStats: submitted!.includeStats ? '1' : '0',
        max: '100'
      });

      const res = await fetch(`/api/integrations/github/commits?${params}`);
      const json = (await res.json()) as
        | { commits: GithubCommit[] }
        | { error: string };

      if (!res.ok) {
        const error = 'error' in json ? json.error : 'Request failed';
        throw new Error(error);
      }

      if (!('commits' in json)) throw new Error('Malformed response');
      return json.commits;
    }
  });

  const summary = useMemo(() => {
    const commits = query.data ?? [];
    const totalChanges = commits.reduce(
      (acc, c) => acc + (c.totalChanges ?? 0),
      0
    );
    const additions = commits.reduce((acc, c) => acc + (c.additions ?? 0), 0);
    const deletions = commits.reduce((acc, c) => acc + (c.deletions ?? 0), 0);

    return {
      commits: commits.length,
      totalChanges,
      additions,
      deletions
    };
  }, [query.data]);

  return (
    <div className='grid gap-6'>
      <Card>
        <CardHeader>
          <CardTitle>Config</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-4 md:grid-cols-2'>
          <div className='grid gap-2'>
            <Label htmlFor='gh-owner'>Owner (org/user)</Label>
            <Input
              id='gh-owner'
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder='ex: vercel'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='gh-repo'>Repo</Label>
            <Input
              id='gh-repo'
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder='ex: next.js'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='gh-since'>Since</Label>
            <Input
              id='gh-since'
              type='date'
              value={since}
              onChange={(e) => setSince(e.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='gh-until'>Until</Label>
            <Input
              id='gh-until'
              type='date'
              value={until}
              onChange={(e) => setUntil(e.target.value)}
            />
          </div>
          <label className='text-muted-foreground flex items-center gap-2 text-sm'>
            <Checkbox
              checked={includeStats}
              onCheckedChange={(v) => setIncludeStats(v === true)}
            />
            Include commit stats (additions/deletions)
          </label>
          <div className='flex items-end'>
            <Button
              type='button'
              onClick={() =>
                setSubmitted({
                  owner: owner.trim(),
                  repo: repo.trim(),
                  since,
                  until,
                  includeStats
                })
              }
              disabled={!owner.trim() || !repo.trim()}
            >
              Fetch
            </Button>
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
            {summary.totalChanges}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Additions</CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-semibold'>
            {summary.additions}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Deletions</CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-semibold'>
            {summary.deletions}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Latest commits</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-3'>
          {query.isLoading && <div>Loading…</div>}
          {query.isError && (
            <div className='text-destructive text-sm'>
              {query.error.message}
            </div>
          )}
          {!query.isLoading &&
            !query.isError &&
            (query.data?.length ?? 0) === 0 && (
              <div className='text-muted-foreground text-sm'>No data.</div>
            )}
          {(query.data ?? []).slice(0, 20).map((c) => (
            <a
              key={c.sha}
              href={c.url}
              target='_blank'
              rel='noreferrer'
              className='hover:bg-muted/50 rounded-md border p-3 transition'
            >
              <div className='truncate text-sm font-medium'>{c.message}</div>
              <div className='text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs'>
                <span>{c.sha.slice(0, 7)}</span>
                <span>{c.authorName ?? c.authorEmail ?? 'unknown'}</span>
                <span>{new Date(c.date).toLocaleString()}</span>
                {c.totalChanges != null && <span>Δ {c.totalChanges}</span>}
              </div>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
