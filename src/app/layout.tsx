import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { siteConfig } from '@/config/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['TikTok', 'Creator Network', 'Brand Deals', 'Content Creator', 'Influencer Marketing'],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-tiktok-black text-white antialiased`}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1C1C1C',
              color: '#fff',
              border: '1px solid #2A2A2A',
              borderRadius: '12px',
            },
            success: {
              iconTheme: {
                primary: '#25F4EE',
                secondary: '#1C1C1C',
              },
            },
            error: {
              iconTheme: {
                primary: '#FE2C55',
                secondary: '#1C1C1C',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
