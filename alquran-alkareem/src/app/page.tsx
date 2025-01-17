import QuranReader from '@/app/QuranReader'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'قارئ القرآن - اقرأ، استمع، وتعلم القرآن الكريم',
  description: 'قارئ قرآن تفاعلي مع ترجمات متعددة، تلاوات صوتية، وإمكانيات البحث. اقرأ واستمع إلى القرآن الكريم مع مختلف المقرئين.',
  keywords: 'قرآن, قارئ القرآن, إسلامي , تلاوات القرآن, ترجمات القرآن',
  openGraph: {
    title: 'قارئ القرآن - اقرأ، استمع، وتعلم القرآن الكريم',
    description: 'قارئ قرآن تفاعلي مع ترجمات وتلاوات صوتية',
    type: 'website',
    locale: 'ar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'قارئ القرآن - اقرأ، استمع، وتعلم القرآن الكريم',
    description: 'قارئ قرآن تفاعلي مع ترجمات وتلاوات صوتية',
  }
};

export default function Home() {
  return (
    <main>
      <QuranReader />
    </main>
  )
}