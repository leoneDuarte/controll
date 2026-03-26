import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongo } from '@/features/controll/server/db';
import { CommitModel } from '@/features/controll/server/models/commit';
import {
  getCookieFromRequest,
  verifyAuthToken
} from '@/features/controll/server/auth';

const querySchema = z.object({
  since: z.string().optional(),
  until: z.string().optional(),
  repo: z.string().optional()
});

export async function GET(req: Request) {
  try {
    await connectMongo();

    const token = getCookieFromRequest(req, 'auth_token');
    if (!token)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await verifyAuthToken(token);

    const { searchParams } = new URL(req.url);
    const parsed = querySchema.parse({
      since: searchParams.get('since') ?? undefined,
      until: searchParams.get('until') ?? undefined,
      repo: searchParams.get('repo') ?? undefined
    });

    const filter: Record<string, unknown> = {};
    if (parsed.repo) filter.repo = parsed.repo;

    if (parsed.since || parsed.until) {
      filter.data = {};
      if (parsed.since) (filter.data as any).$gte = new Date(parsed.since);
      if (parsed.until) (filter.data as any).$lte = new Date(parsed.until);
    }

    const commits = await CommitModel.find(filter).sort({ data: 1 }).lean();
    return NextResponse.json({ ok: true, commits }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
