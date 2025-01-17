import fs from 'fs';
import path from 'path';

export async function GET(req: Request, { params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  const dataDirectory = path.join(process.cwd(), 'source', 'translation', lang as string);

  const filePath = path.join(dataDirectory, `${lang}_translation_${id.padStart(0)}.json`);

  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } else {
    return new Response(JSON.stringify({ message: 'Translation not found' }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}