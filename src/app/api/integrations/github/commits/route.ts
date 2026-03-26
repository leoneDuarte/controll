import { NextResponse } from 'next/server';
import { z } from 'zod';
import { listGithubCommits } from '@/features/integrations/github/server/github-api';

const querySchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  since: z.string().optional(),
  until: z.string().optional(),
  max: z.coerce.number().int().min(1).max(500).default(100),
  includeStats: z
    .preprocess(
      (v) => (typeof v === 'string' ? v.toLowerCase() : v),
      z
        .union([
          z.literal('1'),
          z.literal('true'),
          z.literal('0'),
          z.literal('false')
        ])
        .optional()
    )
    .transform((v) => (v === '0' || v === 'false' ? false : true))
    .default(true)
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = querySchema.parse({
      owner: searchParams.get('owner'),
      repo: searchParams.get('repo'),
      since: searchParams.get('since') ?? undefined,
      until: searchParams.get('until') ?? undefined,
      max: searchParams.get('max') ?? undefined,
      includeStats: searchParams.get('includeStats') ?? undefined
    });

    const commits = await listGithubCommits({
      owner: parsed.owner,
      repo: parsed.repo,
      since: parsed.since,
      until: parsed.until,
      maxCommits: parsed.max,
      includeStats: parsed.includeStats
    });

    return NextResponse.json({ commits });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
