import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StyledJsxRegistry from "../utils/registry";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Black Jack',
  description: 'Card Game - Black Jack',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <StyledJsxRegistry>
          {children}
        </StyledJsxRegistry>
      </body>
    </html>
  )
}
