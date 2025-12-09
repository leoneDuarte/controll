import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não enviados.' },
        { status: 400 }
      );
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: 'Email já cadastrado.' },
        { status: 409 }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return NextResponse.json(
      { message: 'Usuário criado com sucesso', user },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: 'Erro ao criar usuário', details: e.message },
      { status: 500 }
    );
  }
}
