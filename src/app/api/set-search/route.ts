'server only';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { rawQuery } = await req.json();
  if (!rawQuery)
    return NextResponse.json({ error: 'No query provided' }, { status: 400 });
  const cookiesStorage = await cookies();
  // Lưu từ khóa vào cookies (tồn tại 1 ngày)
  cookiesStorage.set('keyword', rawQuery, { path: '/', maxAge: 86400 });

  return NextResponse.json({ success: true });
}
