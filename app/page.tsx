"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Package, MapPin } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { GradientBackground } from "@/components/gradient-background"

// Главная страница - поиск грузоперевозок
export default function HomePage() {
  // Состояние формы поиска с параметрами груза
  const [searchData, setSearchData] = useState({
    origin: "", // Место отправления
    destination: "", // Место назначения
    cargoType: "", // Тип груза
    width: "", // Ширина в метрах
    height: "", // Высота в метрах
    length: "", // Длина в метрах
    weight: "", // Вес в килограммах
  })

  // Обработчик поиска грузоперевозок
  const handleSearch = () => {
    console.log("Поиск грузоперевозок:", searchData)
    // TODO: Здесь будет логика поиска через API
  }

  return (
    <div className="min-h-screen bg-light-bg">
      {/* Декоративный градиентный фон */}
      <GradientBackground />

      {/* Навигационное меню */}
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок страницы */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gold mb-4">Поиск грузоперевозок</h1>
            <p className="text-xl text-dark-text">Найдите надежного перевозчика для вашего груза</p>
          </div>

          {/* Форма поиска */}
          <Card className="mb-8 bg-card-bg border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold">
                <Search className="h-5 w-5" />
                Параметры поиска
              </CardTitle>
              <CardDescription className="text-light-text">
                Укажите детали вашего груза для поиска подходящего перевозчика
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Поля для места отправления и назначения */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin" className="text-light-text">
                    Место отправления
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="origin"
                      placeholder="Введите город отправления"
                      className="pl-10 bg-white text-dark-text border-gray-300 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50 transition-all duration-200"
                      value={searchData.origin}
                      onChange={(e) => setSearchData({ ...searchData, origin: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-light-text">
                    Место прибытия
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="destination"
                      placeholder="Введите город назначения"
                      className="pl-10 bg-white text-dark-text border-gray-300 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50 transition-all duration-200"
                      value={searchData.destination}
                      onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Выбор типа груза */}
              <div className="space-y-2">
                <Label className="text-light-text">Тип груза</Label>
                <Select
                  value={searchData.cargoType}
                  onValueChange={(value) => setSearchData({ ...searchData, cargoType: value })}
                >
                  <SelectTrigger className="bg-white text-dark-text border-gray-300 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50 transition-all duration-200">
                    <SelectValue placeholder="Выберите тип груза" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Генеральные грузы</SelectItem>
                    <SelectItem value="food">Продукты питания</SelectItem>
                    <SelectItem value="construction">Стройматериалы</SelectItem>
                    <SelectItem value="electronics">Электроника</SelectItem>
                    <SelectItem value="chemicals">Химические вещества</SelectItem>
                    <SelectItem value="furniture">Мебель</SelectItem>
                    <SelectItem value="automotive">Автозапчасти</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Габариты груза */}
              <div>
                <Label className="text-base font-medium mb-4 block text-light-text">Габариты груза</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Ширина */}
                  <div className="space-y-2">
                    <Label htmlFor="width" className="text-sm text-light-text">
                      Ширина (м)
                    </Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="0.0"
                      step="0.1"
                      className="bg-white text-dark-text border-gray-300 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50 transition-all duration-200"
                      value={searchData.width}
                      onChange={(e) => setSearchData({ ...searchData, width: e.target.value })}
                    />
                  </div>

                  {/* Высота */}
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-sm text-light-text">
                      Высота (м)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="0.0"
                      step="0.1"
                      className="bg-white text-dark-text border-gray-300 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50 transition-all duration-200"
                      value={searchData.height}
                      onChange={(e) => setSearchData({ ...searchData, height: e.target.value })}
                    />
                  </div>

                  {/* Длина */}
                  <div className="space-y-2">
                    <Label htmlFor="length" className="text-sm text-light-text">
                      Длина (м)
                    </Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="0.0"
                      step="0.1"
                      className="bg-white text-dark-text border-gray-300 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50 transition-all duration-200"
                      value={searchData.length}
                      onChange={(e) => setSearchData({ ...searchData, length: e.target.value })}
                    />
                  </div>

                  {/* Вес */}
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-sm text-light-text">
                      Вес (кг)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="0"
                      className="bg-white text-dark-text border-gray-300 focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50 transition-all duration-200"
                      value={searchData.weight}
                      onChange={(e) => setSearchData({ ...searchData, weight: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Кнопка поиска */}
              <Button
                onClick={handleSearch}
                className="w-full md:w-auto bg-gold hover:bg-gold-hover text-dark-text"
                size="lg"
              >
                <Package className="mr-2 h-4 w-4" />
                Найти перевозку
              </Button>
            </CardContent>
          </Card>

          {/* Статистика платформы */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card-bg border-gray-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2">1000+</div>
                  <div className="text-sm text-light-text">Проверенных перевозчиков</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-bg border-gray-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">24/7</div>
                  <div className="text-sm text-light-text">Поддержка клиентов</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-bg border-gray-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2">99%</div>
                  <div className="text-sm text-light-text">Успешных доставок</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
