import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

// Подключение шрифта Inter с поддержкой латиницы и кириллицы
const inter = Inter({ subsets: ["latin", "cyrillic"] })

// Метаданные для SEO оптимизации
export const metadata: Metadata = {
  title: "LogisPlatform - Логистическая платформа",
  description: "Современная платформа для управления грузоперевозками",
    generator: 'v0.dev'
}

// Корневой layout компонент для всего приложения
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
