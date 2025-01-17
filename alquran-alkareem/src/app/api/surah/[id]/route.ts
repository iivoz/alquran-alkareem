import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;
  const dataDirectory = path.join(process.cwd(), 'source', 'surah');
  const filePath = path.join(dataDirectory, `surah_${id}.json`);

  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    const response = NextResponse.json(data);
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable'); // Cache for 1 year

    return response;
  } else {
    return NextResponse.json({ message: 'Surah not found' });
  }
}
