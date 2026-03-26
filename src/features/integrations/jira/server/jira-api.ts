import 'server-only';

import { z } from 'zod';

const baseUrlSchema = z.string().url();

function getJiraBaseUrl() {
  const baseUrl = process.env.JIRA_BASE_URL ?? '';
  return baseUrlSchema.parse(baseUrl.replace(/\/+$/, ''));
}

function getJiraAuthHeaders(): Record<string, string> {
  const email = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;
  const bearer = process.env.JIRA_BEARER_TOKEN;

  if (bearer) {
    return { Authorization: `Bearer ${bearer}` };
  }

  if (email && apiToken) {
    const token = Buffer.from(`${email}:${apiToken}`).toString('base64');
    return { Authorization: `Basic ${token}` };
  }

  throw new Error(
    'Missing Jira credentials. Set JIRA_BEARER_TOKEN or (JIRA_EMAIL + JIRA_API_TOKEN).'
  );
}

function withParams(url: string, params: Record<string, string | undefined>) {
  const u = new URL(url);
  for (const [key, value] of Object.entries(params)) {
    if (value) u.searchParams.set(key, value);
  }
  return u.toString();
}

async function jiraRequest<T>(
  path: string,
  params?: Record<string, string | undefined>
): Promise<T> {
  const baseUrl = getJiraBaseUrl();
  const url = withParams(`${baseUrl}${path}`, params ?? {});

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      ...getJiraAuthHeaders()
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Jira API error ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

export type JiraProject = {
  id: string;
  key: string;
  name: string;
};

export async function listJiraProjects(input?: {
  startAt?: number;
  maxResults?: number;
}): Promise<{ values: JiraProject[]; total: number; isLast: boolean }> {
  const startAt = String(Math.max(input?.startAt ?? 0, 0));
  const maxResults = String(Math.min(Math.max(input?.maxResults ?? 50, 1), 50));

  const data = await jiraRequest<{
    values: Array<{ id: string; key: string; name: string }>;
    total: number;
    isLast: boolean;
  }>('/rest/api/3/project/search', { startAt, maxResults });

  return {
    values: data.values.map((p) => ({ id: p.id, key: p.key, name: p.name })),
    total: data.total,
    isLast: data.isLast
  };
}

export type JiraIssue = {
  id: string;
  key: string;
  summary: string | null;
  status: string | null;
  assignee: string | null;
  updated: string | null;
};

export async function searchJiraIssues(input: {
  jql: string;
  startAt?: number;
  maxResults?: number;
}): Promise<{ issues: JiraIssue[]; total: number; startAt: number }> {
  const startAt = Math.max(input.startAt ?? 0, 0);
  const maxResults = Math.min(Math.max(input.maxResults ?? 25, 1), 50);

  const data = await jiraRequest<{
    issues: Array<{
      id: string;
      key: string;
      fields: {
        summary?: string;
        updated?: string;
        status?: { name?: string };
        assignee?: { displayName?: string } | null;
      };
    }>;
    total: number;
    startAt: number;
  }>('/rest/api/3/search', {
    jql: input.jql,
    startAt: String(startAt),
    maxResults: String(maxResults),
    fields: 'summary,updated,status,assignee'
  });

  return {
    total: data.total,
    startAt: data.startAt,
    issues: data.issues.map((i) => ({
      id: i.id,
      key: i.key,
      summary: i.fields.summary ?? null,
      status: i.fields.status?.name ?? null,
      assignee: i.fields.assignee?.displayName ?? null,
      updated: i.fields.updated ?? null
    }))
  };
}
