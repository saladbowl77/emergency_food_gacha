import { Inter } from 'next/font/google'
import './form.scss'

import GoogleAnalytics from '../../../components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '非常食に関するアンケート',
  description: '非常食の常備に関するアンケートです',
}

export default function FormLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
