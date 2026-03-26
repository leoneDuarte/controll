import { NextResponse } from 'next/server';
import { z } from 'zod';
import { listGithubRepos } from '@/features/integrations/github/server/github-api';

const querySchema = z.object({
  owner: z.string().min(1),
  ownerType: z.enum(['org', 'user']).default('org'),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(50)
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = querySchema.parse({
      owner: searchParams.get('owner'),
      ownerType: searchParams.get('ownerType') ?? undefined,
      page: searchParams.get('page') ?? undefined,
      perPage: searchParams.get('perPage') ?? undefined
    });

    const repos = await listGithubRepos(parsed);
    return NextResponse.json({ repos });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
