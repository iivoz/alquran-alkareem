 import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export function GET() {
  const dataDirectory = path.join(process.cwd(), 'source')
  const filePath = path.join(dataDirectory, 'surah.json') 
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents) 

  return  NextResponse.json(data);
}
