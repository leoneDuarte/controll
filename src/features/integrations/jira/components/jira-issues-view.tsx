'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type JiraIssue = {
  id: string;
  key: string;
  summary: string | null;
  status: string | null;
  assignee: string | null;
  updated: string | null;
};

export function JiraIssuesView() {
  const [jql, setJql] = useState('ORDER BY updated DESC');
  const [submittedJql, setSubmittedJql] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ['jira-issues', submittedJql],
    enabled: !!submittedJql,
    queryFn: async () => {
      const params = new URLSearchParams({
        jql: submittedJql!,
        maxResults: '25'
      });

      const res = await fetch(`/api/integrations/jira/issues?${params}`);
      const json = (await res.json()) as
        | { issues: JiraIssue[]; total: number }
        | { error: string };

      if (!res.ok) {
        const error = 'error' in json ? json.error : 'Request failed';
        throw new Error(error);
      }
      if (!('issues' in json)) throw new Error('Malformed response');
      return json;
    }
  });

  return (
    <div className='grid gap-6'>
      <Card>
        <CardHeader>
          <CardTitle>JQL</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-4 md:grid-cols-[1fr_auto]'>
          <div className='grid gap-2'>
            <Label htmlFor='jira-jql'>Query</Label>
            <Input
              id='jira-jql'
              value={jql}
              onChange={(e) => setJql(e.target.value)}
              placeholder='project = ABC ORDER BY updated DESC'
            />
          </div>
          <div className='flex items-end'>
            <Button type='button' onClick={() => setSubmittedJql(jql.trim())}>
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Issues</CardTitle>
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
            (query.data?.issues.length ?? 0) === 0 && (
              <div className='text-muted-foreground text-sm'>No data.</div>
            )}

          {(query.data?.issues ?? []).map((issue) => (
            <div key={issue.id} className='rounded-md border p-3'>
              <div className='text-sm font-medium'>
                {issue.key} — {issue.summary ?? '(no summary)'}
              </div>
              <div className='text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs'>
                {issue.status && <span>{issue.status}</span>}
                {issue.assignee && <span>{issue.assignee}</span>}
                {issue.updated && (
                  <span>{new Date(issue.updated).toLocaleString()}</span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
