import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Simu Hub | Premium Mobile Phone Store',
  description: 'Find Your Perfect Phone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased text-white">{children}</body>
    </html>
  )
}
