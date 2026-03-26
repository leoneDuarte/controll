import 'server-only';

import { cookies } from 'next/headers';
import { verifyAuthToken } from './auth';

export async function requireControllAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;

  try {
    const claims = await verifyAuthToken(token);
    return claims;
  } catch {
    return null;
  }
}
