import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

const cairo = Cairo({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'قارئ القرآن - اقرأ، استمع، وتعلم القرآن الكريم',
  description: 'قارئ قرآن تفاعلي مع ترجمات متعددة، تلاوات صوتية، وإمكانيات البحث. اقرأ واستمع إلى القرآن الكريم مع مختلف المقرئين.',
  keywords: 'قرآن, قارئ القرآن, إسلامي, تلاوات القرآن, ترجمات القرآن',
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
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`text-right ${cairo.className} antialiased`}>
        <header className="bg-gradient-to-r from-blue-600 dark:to-primary-foreground to-primary text-white p-4 shadow-md">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="text-lg font-semibold">هذا المشروع متاح للمساهمة</span>
            </div>
            <Button variant="secondary" size="sm" className="transition-colors duration-200">
              <Github className="mr-2 h-4 w-4" />
              <a
                href="https://github.com/SaifSaidi/alquran-alkareem"
                target="_blank"
                rel="noopener noreferrer"
                title="github"
                className="flex items-center"
              >
                ساهم على GitHub
              </a>
            </Button>
          </div>
        </header>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
