'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Search, MapPin, FileText, User, Menu } from 'lucide-react'
import Image from 'next/image'

// Компонент навигации с адаптивным дизайном
export function Navigation() {
  const pathname = usePathname() // Получаем текущий путь для подсветки активной страницы
  const [isOpen, setIsOpen] = useState(false) // Состояние мобильного меню

  // Конфигурация пунктов навигации
  const navigation = [
    { name: 'Поиск грузов', href: '/', icon: Search },
    { name: 'Отслеживание', href: '/tracking', icon: MapPin },
    { name: 'Договоры', href: '/contracts', icon: FileText },
    { name: 'Профиль', href: '/profile', icon: User },
  ]

  // Компонент для рендеринга пунктов навигации
  const NavItems = ({ mobile = false }) => (
    <>
      {navigation.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href // Проверяем активную страницу

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => mobile && setIsOpen(false)} // Закрываем мобильное меню при клике
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-gold/20 text-gold'
                : 'text-gray-400 hover:text-light-gray hover:bg-hover-bg'
            } ${mobile ? 'w-full justify-start' : ''}`}
          >
            <Icon className='h-4 w-4' />
            {item.name}
          </Link>
        )
      })}
    </>
  )

  return (
    <nav className='bg-card-bg shadow-sm border-b border-border'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Логотип с вашим изображением */}
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/logist-plus/logist_logo.png'
              alt='Logist+ Logo'
              width={32}
              height={32}
              className='rounded-full'
            />
            <span className='text-xl font-bold text-gold'>
              Logist<span className='text-light-gray'>+</span>
            </span>
          </Link>

          {/* Десктопная навигация - скрыта на мобильных устройствах */}
          <div className='hidden md:flex items-center space-x-1'>
            <NavItems />
          </div>

          {/* Мобильная навигация - видна только на мобильных устройствах */}
          <div className='md:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='sm'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-64'>
                <div className='flex items-center gap-2 mb-8'>
                  <Image
                    src='/logist-plus/logist_logo.png'
                    alt='Logist+ Logo'
                    width={24}
                    height={24}
                    className='rounded-full'
                  />
                  <span className='text-lg font-bold text-gold'>
                    Logist<span className='text-light-gray'>+</span>
                  </span>
                </div>
                <div className='flex flex-col space-y-2'>
                  <NavItems mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
