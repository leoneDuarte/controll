import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo';
import CommitSchema from '@/models/Commit';

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const since = searchParams.get("since");
    const until = searchParams.get("until");

    const filtro: any = {};

    if (since || until) {
      filtro.data = {};
      if (since) filtro.data.$gte = new Date(since);
      if (until) filtro.data.$lte = new Date(until);
    }

    const commits = await CommitSchema
      .find(filtro)
      .sort({ data: 1 });

    return NextResponse.json(
      { error: false, data: commits },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: true, details: e.message },
      { status: 500 }
    );
  }
}
