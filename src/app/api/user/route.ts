import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo';
import User from '@/models/User';
import Cliente from '@/models/Cliente';

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

    let userData = await User.findOne({ email });
    let clienteData = await Cliente.findOne({ email });

    if (userData || userData) {
      return NextResponse.json(
        { error: 'Email já cadastrado.' },
        { status: 409 }
      );
    }

    clienteData = await Cliente.create({
      nome: name,
      email: email
    });

    userData = await User.create({
      nome: name,
      email: email,
      cliente: clienteData._id,
      senha: password
    });

    return NextResponse.json(
      { message: 'Usuário criado com sucesso', userData },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: 'Erro ao criar usuário', details: e.message },
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    await connectDB();
    const userId = req.headers.get('x-user-id');
    const email = req.headers.get('x-user-email');
    const data = await User.find({});

    return NextResponse.json(
      { message: 'Usuários buscados com sucesso', data },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: 'Erro ao criar usuário', details: e.message },
      { status: 500 }
    );
  }
}
