import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rishabh Chandrode',
  description: 'Rishabh Chandrode Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <meta name="google-site-verification" content="7HB1HRnTETWZ6K_maXAeU7t6lGhXvdQXx6B4eW8ByzI" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
