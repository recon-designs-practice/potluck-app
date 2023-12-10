import React from 'react'
import type { Metadata } from 'next'
import Header from './components/header/Header'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header>
          <h3>Header</h3>
        </Header>
        {children}
      </body>
    </html>
  )
}
