import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

interface SurahData {
  // Define the structure of your surah.json data here
  // For example:
  id: number;
  name: string;
  // Add other fields as necessary
}

let cachedData: SurahData | null = null;

export function GET() {
  if (!cachedData) {
    const dataDirectory = path.join(process.cwd(), 'source')
    const filePath = path.join(dataDirectory, 'surah.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    cachedData = JSON.parse(fileContents)
  }

  const response = NextResponse.json(cachedData)
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  
  return response
}
