import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongo } from '@/features/controll/server/db';
import { CommitModel } from '@/features/controll/server/models/commit';
import {
  getCookieFromRequest,
  verifyAuthToken
} from '@/features/controll/server/auth';
import { listGithubCommits } from '@/features/integrations/github/server/github-api';

const bodySchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  since: z.string().optional(),
  until: z.string().optional(),
  max: z.number().int().min(1).max(500).optional()
});

export async function POST(req: Request) {
  try {
    await connectMongo();

    const token = getCookieFromRequest(req, 'auth_token');
    if (!token)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await verifyAuthToken(token);

    const body = bodySchema.parse(await req.json());

    const commits = await listGithubCommits({
      owner: body.owner,
      repo: body.repo,
      since: body.since,
      until: body.until,
      maxCommits: body.max ?? 200,
      includeStats: true
    });

    const repoFull = `${body.owner}/${body.repo}`;

    const ops = commits.map((c) => ({
      updateOne: {
        filter: { sha: c.sha, repo: repoFull },
        update: {
          $set: {
            sha: c.sha,
            autor: c.authorName ?? 'unknown',
            email: c.authorEmail ?? 'unknown',
            mensagem: c.message,
            repo: repoFull,
            url: c.url,
            data: new Date(c.date),
            adicoes: c.additions ?? 0,
            remocoes: c.deletions ?? 0,
            total_alteracoes: c.totalChanges ?? 0
          }
        },
        upsert: true
      }
    }));

    const result = ops.length ? await CommitModel.bulkWrite(ops) : null;

    return NextResponse.json(
      {
        ok: true,
        fetched: commits.length,
        upserted: result?.upsertedCount ?? 0,
        modified: result?.modifiedCount ?? 0
      },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
