import { Inter } from 'next/font/google'
import './globals.scss'

import { Header } from '../components/Header'
import GoogleAnalytics from '../components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '非常食ガチャ',
  description: '非常食をガチャガチャ風におすすめしてくれるwebアプリ',
  openGraph: {
    type: 'website',
    url: 'https://emergency-food-gacha.rkwt.me/',
    siteName: '非常食ガチャ',
    title: '非常食ガチャ',
    description: '非常食をガチャガチャ風におすすめしてくれるwebアプリ',
    images: [
      {
        url: 'https://emergency-food-gacha.rkwt.me/ogp.jpeg',
      },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
