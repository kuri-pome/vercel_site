import type { Metadata } from 'next'
import '@/app/globals.css'
import * as Blog from "@/features/blog/components/Index"

export const metadata: Metadata = {
  title: 'kuripomeのブログ',
  description: 'kuripomeのエンジニアの投稿サイト',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Blog.Left />
      </div>
      <div className="w-1/2">
        {children}
      </div>
      <div className="w-1/4">
        <Blog.Right />
      </div>
    </div>
  )
}
