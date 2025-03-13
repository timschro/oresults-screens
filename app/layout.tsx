import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "../scrollbar-hide.css" // Import the scrollbar hiding CSS

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Results Display",
  description: "Live sports results display",
  cache: "force-cache",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body className={`${inter.className} scrollbar-hide`}>{children}</body>
    </html>
  )
}



import './globals.css'