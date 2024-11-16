 
import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export   async function GET(req:NextRequest,
   { params }: { params: Promise<{ id?: string }> }
) {
  
  const {id} = await params  
  const dataDirectory = path.join(process.cwd(), 'source', 'surah')
  const filePath = path.join(dataDirectory, `surah_${id}.json`)

  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)
  return Response.json(data)
  } else {
   return Response.json({ message: 'Surah not found' })
  }
}
 
