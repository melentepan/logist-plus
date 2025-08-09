'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Truck,
  Clock,
  NavigationIcon,
  Zap,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { GradientBackground } from '@/components/gradient-background'
import Image from 'next/image'

export default function TrackingPage() {
  const [vehicles] = useState([
    {
      id: 'TR001',
      driver: 'Иванов А.С.',
      status: 'В пути',
      location: 'Москва → Санкт-Петербург',
      coordinates: '55.7558° N, 37.6176° E',
      cargo: 'Электроника',
      eta: '14:30',
      progress: 65,
      currentCity: 'Красногорск',
    },
    {
      id: 'TR002',
      driver: 'Петров В.И.',
      status: 'Загрузка',
      location: 'Одинцово',
      coordinates: '55.6761° N, 37.2615° E',
      cargo: 'Стройматериалы',
      eta: '16:00',
      progress: 15,
      currentCity: 'Одинцово',
    },
    {
      id: 'TR003',
      driver: 'Сидоров М.П.',
      status: 'Завершено',
      location: 'Видное',
      coordinates: '55.5533° N, 37.7069° E',
      cargo: 'Продукты питания',
      eta: 'Завершено',
      progress: 100,
      currentCity: 'Видное',
    },
    {
      id: 'TR004',
      driver: 'Козлов Д.А.',
      status: 'В пути',
      location: 'Люберцы → Балашиха',
      coordinates: '55.6758° N, 37.8975° E',
      cargo: 'Мебель',
      eta: '18:15',
      progress: 45,
      currentCity: 'Люберцы',
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В пути':
        return 'bg-gold'
      case 'Загрузка':
        return 'bg-yellow-500'
      case 'Доставлено':
        return 'bg-gold'
      case 'Завершено':
        return 'bg-success'
      case 'Задержка':
        return 'bg-error'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'В пути':
        return 'default'
      case 'Загрузка':
        return 'secondary'
      case 'Доставлено':
        return 'outline'
      case 'Завершено':
        return 'default'
      default:
        return 'secondary'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'В пути':
        return <Truck className='h-4 w-4' />
      case 'Загрузка':
        return <Clock className='h-4 w-4' />
      case 'Доставлено':
        return <Zap className='h-4 w-4' />
      case 'Завершено':
        return <CheckCircle className='h-4 w-4' />
      case 'Задержка':
        return <AlertTriangle className='h-4 w-4' />
      default:
        return <MapPin className='h-4 w-4' />
    }
  }

  return (
    <div className='min-h-screen bg-light-bg'>
      <GradientBackground />
      <Navigation />

      <main className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gold mb-2'>
              Отслеживание грузов
            </h1>
            <p className='text-dark-text'>
              Мониторинг ваших автомобилей в реальном времени
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Карта */}
            <Card className='lg:col-span-1 bg-card-bg border-gray-200'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-gold'>
                  <MapPin className='h-5 w-5' />
                  Карта отслеживания
                </CardTitle>
                <CardDescription className='text-light-text'>
                  Местоположение автомобилей в Московском регионе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='relative rounded-lg overflow-hidden h-96'>
                  <Image
                    src='/logist-plus/images/moscow-map.jpg'
                    alt='Карта Московского региона с местоположением автомобилей'
                    fill
                    className='object-cover'
                  />

                  {/* Маркеры автомобилей на карте */}
                  <div className='absolute inset-0'>
                    {/* Маркер в Красногорске */}
                    <div className='absolute top-[20%] left-[25%] transform -translate-x-1/2 -translate-y-1/2'>
                      <div className='bg-gold rounded-full p-2 shadow-lg'>
                        <Truck className='h-4 w-4 text-dark-text' />
                      </div>
                      <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-dark-text text-white px-2 py-1 rounded text-xs font-medium shadow-lg'>
                        TR001
                      </div>
                    </div>

                    {/* Маркер в Одинцово */}
                    <div className='absolute top-[45%] left-[15%] transform -translate-x-1/2 -translate-y-1/2'>
                      <div className='bg-yellow-500 rounded-full p-2 shadow-lg'>
                        <Clock className='h-4 w-4 text-dark-text' />
                      </div>
                      <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-dark-text text-white px-2 py-1 rounded text-xs font-medium shadow-lg'>
                        TR002
                      </div>
                    </div>

                    {/* Маркер в Видном */}
                    <div className='absolute top-[70%] left-[55%] transform -translate-x-1/2 -translate-y-1/2'>
                      <div className='bg-success rounded-full p-2 shadow-lg'>
                        <CheckCircle className='h-4 w-4 text-dark-text' />
                      </div>
                      <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-dark-text text-white px-2 py-1 rounded text-xs font-medium shadow-lg'>
                        TR003
                      </div>
                    </div>

                    {/* Маркер в Люберцах */}
                    <div className='absolute top-[60%] left-[75%] transform -translate-x-1/2 -translate-y-1/2'>
                      <div className='bg-gold rounded-full p-2 shadow-lg'>
                        <Truck className='h-4 w-4 text-dark-text' />
                      </div>
                      <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-dark-text text-white px-2 py-1 rounded text-xs font-medium shadow-lg'>
                        TR004
                      </div>
                    </div>
                  </div>

                  {/* Легенда */}
                  <div className='absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200'>
                    <div className='text-xs font-medium mb-2 text-dark-text'>
                      Статусы:
                    </div>
                    <div className='space-y-1 text-xs'>
                      <div className='flex items-center gap-2'>
                        <div className='w-3 h-3 bg-gold rounded-full'></div>
                        <span className='text-dark-text'>
                          В пути / Доставлено
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
                        <span className='text-dark-text'>Загрузка</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='w-3 h-3 bg-success rounded-full'></div>
                        <span className='text-dark-text'>Завершено</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Список автомобилей */}
            <Card className='lg:col-span-1 bg-card-bg border-gray-200'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-gold'>
                  <Truck className='h-5 w-5' />
                  Ваши автомобили
                </CardTitle>
                <CardDescription className='text-light-text'>
                  Текущий статус и местоположение
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4 max-h-96 overflow-y-auto'>
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className='border-2 border-gold rounded-lg p-4 space-y-3 bg-card-bg'
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div
                            className={`w-3 h-3 rounded-full ${getStatusColor(
                              vehicle.status
                            )}`}
                          />
                          <div>
                            <p className='font-medium text-light-text'>
                              {vehicle.id}
                            </p>
                            <p className='text-sm text-gray-300'>
                              {vehicle.driver}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={getStatusBadgeVariant(vehicle.status)}
                          className={`flex items-center gap-1 ${
                            vehicle.status === 'Завершено'
                              ? 'bg-success text-dark-text'
                              : ''
                          }`}
                        >
                          {getStatusIcon(vehicle.status)}
                          {vehicle.status}
                        </Badge>
                      </div>

                      <div className='space-y-2 text-sm'>
                        <div className='flex items-center gap-2'>
                          <NavigationIcon className='h-4 w-4 text-gold' />
                          <span className='text-light-text'>
                            {vehicle.location}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <MapPin className='h-4 w-4 text-gold' />
                          <span className='text-gray-300'>
                            {vehicle.currentCity}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Clock className='h-4 w-4 text-gold' />
                          <span className='text-light-text'>
                            ETA: {vehicle.eta}
                          </span>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-light-text'>
                            Груз: {vehicle.cargo}
                          </span>
                          <span className='text-light-text'>
                            {vehicle.progress}%
                          </span>
                        </div>
                        <div className='w-full bg-gray-700 rounded-full h-2'>
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(
                              vehicle.status
                            )}`}
                            style={{ width: `${vehicle.progress}%` }}
                          />
                        </div>
                      </div>

                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full bg-transparent border-gold text-gold hover:bg-gold hover:text-dark-text'
                      >
                        Подробнее
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Статистика */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-8'>
            <Card className='bg-card-bg border-gray-200'>
              <CardContent className='pt-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gold mb-1'>4</div>
                  <div className='text-sm text-light-text'>Активных рейса</div>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-card-bg border-gray-200'>
              <CardContent className='pt-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-success mb-1'>1</div>
                  <div className='text-sm text-light-text'>
                    Доставлено сегодня
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-card-bg border-gray-200'>
              <CardContent className='pt-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-yellow-500 mb-1'>
                    1
                  </div>
                  <div className='text-sm text-light-text'>
                    В процессе загрузки
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-card-bg border-gray-200'>
              <CardContent className='pt-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gold mb-1'>2,450</div>
                  <div className='text-sm text-light-text'>Км сегодня</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
