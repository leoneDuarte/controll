import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { connectMongo } from '@/features/controll/server/db';
import { UserModel } from '@/features/controll/server/models/user';
import { signAuthToken } from '@/features/controll/server/auth';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export async function POST(req: Request) {
  try {
    await connectMongo();

    const body = bodySchema.parse(await req.json());

    const user = await UserModel.findOne({ email: body.email }).lean();
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 401 }
      );
    }

    const senha = typeof user.senha === 'string' ? user.senha : '';
    const ok = await bcrypt.compare(body.password, senha).catch(() => false);

    if (!ok) {
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 401 }
      );
    }

    const token = await signAuthToken({
      userId: String(user._id),
      email: user.email
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _senha, ...safeUser } = user as any;

    const res = NextResponse.json(
      { ok: true, user: safeUser, redirect: '/dashboard/controll' },
      { status: 200 }
    );

    res.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
