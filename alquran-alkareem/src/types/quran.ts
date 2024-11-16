export type Surah = {
  place: string
  type: string
  count: number
  title: string
  titleAr: string
  index: string
  pages: string
  juz: Array<{ index: string; verse: { start: string; end: string } }>
  audio_ayat: number 
}

export type Verse = {
  [key: string]: string
}

export type Translation = {
  index: number
  verse: {
    [key: string]: string
  }
  
  count: number
}
