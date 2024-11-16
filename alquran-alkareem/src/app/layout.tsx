import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

const cairo = Cairo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'قارئ القرآن الكريم',
  description: 'موقع قارئ القرآن الكريم مع صوتيات وتفاسير',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`text-right ${cairo.className} antialiased`}>
      <div className="bg-gradient-to-r from-blue-600 dark:to-primary-foreground to-primary  text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
       
          <span className="text-lg font-semibold">هذا المشروع متاح للمساهمة</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="transition-colors duration-200"
        >
          <Github className="mr-2 h-4 w-4" />
          <a
            href="https://github.com/SaifSaidi/alquran-alkareem"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            ساهم على GitHub
          </a>
        </Button>
      </div>
    </div>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >{children}
        </ThemeProvider>
      </body>
    </html>
  )
}
