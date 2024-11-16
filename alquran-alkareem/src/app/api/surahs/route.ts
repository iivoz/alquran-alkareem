 import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export function GET(req: NextRequest, res: NextResponse) {
  const dataDirectory = path.join(process.cwd(), 'source')
  const filePath = path.join(dataDirectory, 'surah.json') 
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents) 

  return  NextResponse.json(data);
}
