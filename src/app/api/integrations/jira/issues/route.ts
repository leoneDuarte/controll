import { NextResponse } from 'next/server';
import { z } from 'zod';
import { searchJiraIssues } from '@/features/integrations/jira/server/jira-api';

const querySchema = z.object({
  jql: z.string().min(1).default('ORDER BY updated DESC'),
  startAt: z.coerce.number().int().min(0).default(0),
  maxResults: z.coerce.number().int().min(1).max(50).default(25)
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = querySchema.parse({
      jql: searchParams.get('jql') ?? undefined,
      startAt: searchParams.get('startAt') ?? undefined,
      maxResults: searchParams.get('maxResults') ?? undefined
    });

    const data = await searchJiraIssues(parsed);
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
