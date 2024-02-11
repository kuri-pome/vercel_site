import type { Metadata } from 'next'
import './globals.css'
import { Header } from "../app/components/layouts/header/Header"
import { Footer } from "../app/components/layouts/footer/Footer"


export const metadata: Metadata = {
  title: 'kuripome site',
  description: 'kuripome site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
