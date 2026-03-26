import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { connectMongo } from '@/features/controll/server/db';
import { ClienteModel } from '@/features/controll/server/models/cliente';
import { UserModel } from '@/features/controll/server/models/user';
import {
  getCookieFromRequest,
  verifyAuthToken
} from '@/features/controll/server/auth';

const createSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(req: Request) {
  try {
    await connectMongo();

    const body = createSchema.parse(await req.json());
    const existingUser = await UserModel.findOne({ email: body.email }).lean();
    const existingCliente = await ClienteModel.findOne({
      email: body.email
    }).lean();

    if (existingUser || existingCliente) {
      return NextResponse.json(
        { error: 'Email já cadastrado.' },
        { status: 409 }
      );
    }

    const cliente = await ClienteModel.create({
      nome: body.name,
      email: body.email
    });

    const senhaHash = await bcrypt.hash(body.password, 10);

    const user = await UserModel.create({
      nome: body.name,
      email: body.email,
      cliente: cliente._id,
      senha: senhaHash
    });

    return NextResponse.json(
      { ok: true, userId: String(user._id), clienteId: String(cliente._id) },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    await connectMongo();

    const token = getCookieFromRequest(req, 'auth_token');
    if (!token)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await verifyAuthToken(token);

    const users = await UserModel.find({}).select('-senha').lean();
    return NextResponse.json({ ok: true, users }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
