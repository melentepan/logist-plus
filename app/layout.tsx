import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { APP_CONFIG } from '@/lib/config'

// Подключение шрифта Inter с поддержкой латиницы и кириллицы
const inter = Inter({ subsets: ['latin', 'cyrillic'] })

// Метаданные для SEO оптимизации с использованием конфигурации
export const metadata: Metadata = {
  title: 'Logist+ - Логистическая платформа',
  description: 'Современная платформа для управления грузоперевозками',
}

// Корневой layout компонент для всего приложения
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ru'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
