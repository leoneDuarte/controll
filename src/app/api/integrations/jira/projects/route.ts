import { NextResponse } from 'next/server';
import { z } from 'zod';
import { listJiraProjects } from '@/features/integrations/jira/server/jira-api';

const querySchema = z.object({
  startAt: z.coerce.number().int().min(0).default(0),
  maxResults: z.coerce.number().int().min(1).max(50).default(50)
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = querySchema.parse({
      startAt: searchParams.get('startAt') ?? undefined,
      maxResults: searchParams.get('maxResults') ?? undefined
    });

    const data = await listJiraProjects(parsed);
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
