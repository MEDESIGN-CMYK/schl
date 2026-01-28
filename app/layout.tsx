import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Housing Case Management System',
  description: 'Enterprise housing case management application',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/ico-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/ico-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/ico.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
