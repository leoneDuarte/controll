import { NextResponse } from 'next/server';
import { connectMongo } from '@/features/controll/server/db';
import { UserModel } from '@/features/controll/server/models/user';
import {
  getCookieFromRequest,
  verifyAuthToken
} from '@/features/controll/server/auth';

export async function GET(req: Request) {
  try {
    await connectMongo();

    const token = getCookieFromRequest(req, 'auth_token');
    if (!token)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const claims = await verifyAuthToken(token);
    const user = await UserModel.findById(claims.sub).lean();
    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _senha, ...safeUser } = user as any;

    return NextResponse.json({ ok: true, user: safeUser }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
