import 'server-only';

import { z } from 'zod';

const githubTokenSchema = z.string().min(1);

export type GithubOwnerType = 'org' | 'user';

export type GithubRepo = {
  id: number;
  name: string;
  fullName: string;
  private: boolean;
  htmlUrl: string;
  defaultBranch: string | null;
  updatedAt: string | null;
};

export type GithubCommit = {
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

function getGithubToken() {
  const token = process.env.GITHUB_TOKEN ?? process.env.GITHUB_PAT ?? '';
  return githubTokenSchema.parse(token);
}

function getGithubBaseUrl() {
  return process.env.GITHUB_BASE_URL ?? 'https://api.github.com';
}

function getNextLink(linkHeader: string | null): string | null {
  if (!linkHeader) return null;
  const nextPart = linkHeader
    .split(',')
    .map((p) => p.trim())
    .find((p) => p.endsWith('rel="next"'));
  if (!nextPart) return null;
  const match = nextPart.match(/<([^>]+)>/);
  return match?.[1] ?? null;
}

async function githubRequest<T>(
  url: string,
  init?: RequestInit
): Promise<{ data: T; headers: Headers }> {
  const token = getGithubToken();
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init?.headers ?? {})
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `GitHub API error ${res.status}: ${text || res.statusText}`
    );
  }

  const data = (await res.json()) as T;
  return { data, headers: res.headers };
}

function withParams(url: string, params: Record<string, string | undefined>) {
  const u = new URL(url);
  for (const [key, value] of Object.entries(params)) {
    if (value) u.searchParams.set(key, value);
  }
  return u.toString();
}

export async function listGithubRepos(input: {
  owner: string;
  ownerType: GithubOwnerType;
  perPage?: number;
  page?: number;
}): Promise<GithubRepo[]> {
  const base = getGithubBaseUrl();
  const perPage = String(Math.min(Math.max(input.perPage ?? 50, 1), 100));
  const page = String(Math.max(input.page ?? 1, 1));

  const path =
    input.ownerType === 'org'
      ? `/orgs/${encodeURIComponent(input.owner)}/repos`
      : `/users/${encodeURIComponent(input.owner)}/repos`;

  const url = withParams(`${base}${path}`, {
    per_page: perPage,
    page,
    sort: 'updated'
  });

  const { data } = await githubRequest<
    Array<{
      id: number;
      name: string;
      full_name: string;
      private: boolean;
      html_url: string;
      default_branch?: string;
      updated_at?: string;
    }>
  >(url);

  return data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    private: repo.private,
    htmlUrl: repo.html_url,
    defaultBranch: repo.default_branch ?? null,
    updatedAt: repo.updated_at ?? null
  }));
}

async function mapWithConcurrency<TIn, TOut>(
  items: TIn[],
  concurrency: number,
  fn: (item: TIn) => Promise<TOut>
): Promise<TOut[]> {
  const results: TOut[] = new Array(items.length);
  let index = 0;

  const workers = Array.from({
    length: Math.min(concurrency, items.length)
  }).map(async () => {
    while (true) {
      const i = index;
      index += 1;
      if (i >= items.length) return;
      results[i] = await fn(items[i]);
    }
  });

  await Promise.all(workers);
  return results;
}

export async function listGithubCommits(input: {
  owner: string;
  repo: string;
  since?: string;
  until?: string;
  maxCommits?: number;
  includeStats?: boolean;
  statsConcurrency?: number;
}): Promise<GithubCommit[]> {
  const base = getGithubBaseUrl();
  const maxCommits = Math.min(Math.max(input.maxCommits ?? 100, 1), 500);
  const includeStats = input.includeStats ?? true;
  const statsConcurrency = Math.min(
    Math.max(input.statsConcurrency ?? 5, 1),
    10
  );

  const commits: Array<{
    sha: string;
    html_url: string;
    commit: {
      message: string;
      author: { name?: string; email?: string; date: string } | null;
    };
  }> = [];

  let nextUrl: string | null = withParams(
    `${base}/repos/${encodeURIComponent(input.owner)}/${encodeURIComponent(
      input.repo
    )}/commits`,
    {
      per_page: '100',
      since: input.since,
      until: input.until
    }
  );

  while (nextUrl && commits.length < maxCommits) {
    const { data, headers } = await githubRequest<typeof commits>(nextUrl);
    commits.push(...data);
    nextUrl = getNextLink(headers.get('link'));
  }

  const trimmed = commits.slice(0, maxCommits);
  const baseCommit: GithubCommit[] = trimmed.map((c) => ({
    sha: c.sha,
    repo: `${input.owner}/${input.repo}`,
    url: c.html_url,
    message: c.commit.message,
    authorName: c.commit.author?.name ?? null,
    authorEmail: c.commit.author?.email ?? null,
    date: c.commit.author?.date ?? new Date().toISOString(),
    additions: null,
    deletions: null,
    totalChanges: null
  }));

  if (!includeStats) return baseCommit;

  const stats = await mapWithConcurrency(
    baseCommit,
    statsConcurrency,
    async (commit) => {
      const url = `${base}/repos/${encodeURIComponent(input.owner)}/${encodeURIComponent(
        input.repo
      )}/commits/${commit.sha}`;

      const { data } = await githubRequest<{
        stats?: { additions: number; deletions: number; total: number };
      }>(url);

      return {
        ...commit,
        additions: data.stats?.additions ?? null,
        deletions: data.stats?.deletions ?? null,
        totalChanges: data.stats?.total ?? null
      };
    }
  );

  return stats;
}
