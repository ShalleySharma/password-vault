import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import ThemeToggleWrapper from './components/ThemeToggleWrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'Password Vault',
  description: 'Secure password management application',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggleWrapper />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
