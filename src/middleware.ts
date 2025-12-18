// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    const headers = new Headers(req.headers);
    headers.set('x-user-id', String(payload.id));
    headers.set('x-user-email', String(payload.email));

    return NextResponse.next({
      request: { headers },
    });
  } catch (err: any) {
    console.error('JWT ERROR:', err.message);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/user/:path*'],
};
