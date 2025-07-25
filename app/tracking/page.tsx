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
import { MapPin, Truck, Clock, NavigationIcon } from 'lucide-react'
import { Navigation } from '@/components/navigation'

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
    },
    {
      id: 'TR002',
      driver: 'Петров В.И.',
      status: 'Загрузка',
      location: 'Екатеринбург',
      coordinates: '56.8431° N, 60.6454° E',
      cargo: 'Стройматериалы',
      eta: '16:00',
      progress: 15,
    },
    {
      id: 'TR003',
      driver: 'Сидоров М.П.',
      status: 'Доставлено',
      location: 'Новосибирск',
      coordinates: '55.0084° N, 82.9357° E',
      cargo: 'Продукты питания',
      eta: 'Завершено',
      progress: 100,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В пути':
        return 'bg-gold'
      case 'Загрузка':
        return 'bg-amber-500'
      case 'Доставлено':
        return 'bg-emerald-500'
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
      default:
        return 'secondary'
    }
  }

  return (
    <div className='min-h-screen bg-dark-bg'>
      <Navigation />

      <main className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gold mb-2'>
              Отслеживание грузов
            </h1>
            <p className='text-medium'>
              Мониторинг ваших автомобилей в реальном времени
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Карта */}
            <Card className='lg:col-span-1'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <MapPin className='h-5 w-5' />
                  Карта отслеживания
                </CardTitle>
                <CardDescription>
                  Местоположение автомобилей в реальном времени
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='bg-gray-100 rounded-lg h-96 flex items-center justify-center relative overflow-hidden'>
                  <div className='relative w-full h-full'>
                    <img
                      src='/logist-plus/map-placeholder.jpg'
                      alt='Карта с местоположением автомобилей'
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-black/70'></div>
                  </div>
                  <div className='absolute inset-0 bg-blue-500/10 flex items-center justify-center'>
                    <div className='text-center'>
                      <MapPin className='h-12 w-12 text-blue-600 mx-auto mb-2' />
                      <p className='text-sm text-gray-700'>
                        Интерактивная карта
                      </p>
                      <p className='text-xs text-gray-600'>
                        Отображение в реальном времени
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Список автомобилей */}
            <Card className='lg:col-span-1'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Truck className='h-5 w-5' />
                  Ваши автомобили
                </CardTitle>
                <CardDescription>
                  Текущий статус и местоположение
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4 max-h-96 overflow-y-auto'>
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className='border rounded-lg p-4 space-y-3'
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div
                            className={`w-3 h-3 rounded-full ${getStatusColor(
                              vehicle.status
                            )}`}
                          />
                          <div>
                            <p className='font-medium'>{vehicle.id}</p>
                            <p className='text-sm text-bright'>
                              {vehicle.driver}
                            </p>
                          </div>
                        </div>
                        <Badge variant={getStatusBadgeVariant(vehicle.status)}>
                          {vehicle.status}
                        </Badge>
                      </div>

                      <div className='space-y-2 text-sm'>
                        <div className='flex items-center gap-2'>
                          <NavigationIcon className='h-4 w-4 text-bright' />
                          <span className='text-bright'>
                            {vehicle.location}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <MapPin className='h-4 w-4 text-bright' />
                          <span className='text-medium'>
                            {vehicle.coordinates}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Clock className='h-4 w-4 text-bright' />
                          <span className='text-bright'>
                            ETA: {vehicle.eta}
                          </span>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-bright'>
                            Груз: {vehicle.cargo}
                          </span>
                          <span className='text-bright'>
                            {vehicle.progress}%
                          </span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2'>
                          <div
                            className={`h-2 rounded-full ${getStatusColor(
                              vehicle.status
                            )}`}
                            style={{ width: `${vehicle.progress}%` }}
                          />
                        </div>
                      </div>

                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full bg-transparent'
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
            <Card>
              <CardContent className='pt-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gold mb-1'>3</div>
                  <div className='text-sm text-bright'>Активных рейса</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='pt-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-emerald-400 mb-1'>
                    1
                  </div>
                  <div className='text-sm text-bright'>Доставлено сегодня</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='pt-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-amber-400 mb-1'>
                    1
                  </div>
                  <div className='text-sm text-bright'>В процессе загрузки</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='pt-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-purple-400 mb-1'>
                    2,450
                  </div>
                  <div className='text-sm text-bright'>Км сегодня</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
