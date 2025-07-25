"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, CreditCard, History, BarChart3, Edit, Save, Plus, Minus } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "Иван Петрович Сидоров",
    phone: "+7 (999) 123-45-67",
    email: "ivan.sidorov@example.com",
  })

  const [subscription, setSubscription] = useState("Select")
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const transactions = [
    { id: 1, date: "15.01.2024", amount: 15000, type: "Пополнение", method: "Банковская карта" },
    { id: 2, date: "14.01.2024", amount: -8500, type: "Оплата перевозки", method: "Баланс" },
    { id: 3, date: "12.01.2024", amount: 25000, type: "Пополнение", method: "Банковский перевод" },
    { id: 4, date: "10.01.2024", amount: -12000, type: "Оплата перевозки", method: "Баланс" },
    { id: 5, date: "08.01.2024", amount: 30000, type: "Пополнение", method: "Банковская карта" },
  ]

  const stats = {
    totalKm: 45678,
    totalOrders: 234,
    avgDeliveryTime: 18.5,
  }

  const handleSave = () => {
    setIsEditing(false)
    console.log("Сохранены данные:", userInfo)
  }

  const handleTransaction = (type: "deposit" | "withdraw") => {
    if (amount && paymentMethod) {
      console.log(`${type === "deposit" ? "Пополнение" : "Вывод"} средств:`, { amount, paymentMethod })
      setAmount("")
      setPaymentMethod("")
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gold mb-2">Личный кабинет</h1>
          <p className="text-medium">Управление профилем, подпиской и финансами</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Подписка
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Финансы
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Статистика
            </TabsTrigger>
          </TabsList>

          {/* Личная информация */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Личная информация</CardTitle>
                    <CardDescription>Управление основными данными профиля</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Сохранить
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Редактировать
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Полное имя</Label>
                    <Input
                      id="name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                      disabled={!isEditing}
                      className="focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50 transition-all duration-200 disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                      disabled={!isEditing}
                      className="focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50 transition-all duration-200 disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    disabled={!isEditing}
                    className="focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50 transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Подписка */}
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Подписка аккаунта</CardTitle>
                <CardDescription>Выберите подходящий тарифный план</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Базовая",
                      price: "1,990 ₽/мес",
                      features: ["До 10 заказов в месяц", "Базовая поддержка", "Стандартная отчетность"],
                    },
                    {
                      name: "Select",
                      price: "4,990 ₽/мес",
                      features: [
                        "До 50 заказов в месяц",
                        "Приоритетная поддержка",
                        "Расширенная аналитика",
                        "API доступ",
                      ],
                    },
                    {
                      name: "Premium",
                      price: "9,990 ₽/мес",
                      features: [
                        "Неограниченные заказы",
                        "24/7 поддержка",
                        "Полная аналитика",
                        "Персональный менеджер",
                      ],
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className={`border rounded-lg p-6 cursor-pointer transition-all ${
                        subscription === plan.name ? "border-gold bg-gold/10" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSubscription(plan.name)}
                    >
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-2xl font-bold text-gold mb-4">{plan.price}</div>
                        {subscription === plan.name && <Badge className="mb-4">Текущий план</Badge>}
                      </div>
                      <ul className="space-y-2 text-sm">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                            <span className="text-bright">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button size="lg">Изменить план</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Финансы */}
          <TabsContent value="finance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Баланс и операции */}
              <Card>
                <CardHeader>
                  <CardTitle>Баланс и операции</CardTitle>
                  <CardDescription>Пополнение и вывод денежных средств</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-gold/10 rounded-lg">
                    <div className="text-3xl font-bold text-gold mb-2">49,500 ₽</div>
                    <div className="text-sm text-bright">Текущий баланс</div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Сумма</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Введите сумму"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Способ оплаты</Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger className="focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/50 transition-all duration-200">
                          <SelectValue placeholder="Выберите способ оплаты" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Банковская карта</SelectItem>
                          <SelectItem value="transfer">Банковский перевод</SelectItem>
                          <SelectItem value="wallet">Электронный кошелек</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button onClick={() => handleTransaction("deposit")} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Пополнить
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleTransaction("withdraw")}
                        className="flex items-center gap-2"
                      >
                        <Minus className="h-4 w-4" />
                        Вывести
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* История операций */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    История операций
                  </CardTitle>
                  <CardDescription>Последние финансовые операции</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{transaction.type}</p>
                          <p className="text-xs text-bright">{transaction.date}</p>
                          <p className="text-xs text-medium">{transaction.method}</p>
                        </div>
                        <div className={`font-bold ${transaction.amount > 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {transaction.amount > 0 ? "+" : ""}
                          {transaction.amount.toLocaleString()} ₽
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Статистика */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold mb-2">{stats.totalKm.toLocaleString()}</div>
                    <div className="text-sm text-bright">Общий километраж</div>
                    <div className="text-xs text-medium mt-1">За все время</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">{stats.totalOrders}</div>
                    <div className="text-sm text-bright">Общее количество заказов</div>
                    <div className="text-xs text-medium mt-1">Выполнено успешно</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">{stats.avgDeliveryTime}ч</div>
                    <div className="text-sm text-bright">Среднее время доставки</div>
                    <div className="text-xs text-medium mt-1">По всем заказам</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Детальная статистика</CardTitle>
                <CardDescription>Подробная аналитика вашей деятельности</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gold">Статистика по месяцам</h4>
                    <div className="space-y-3">
                      {[
                        { month: "Январь 2024", orders: 28, km: 3450 },
                        { month: "Декабрь 2023", orders: 32, km: 4120 },
                        { month: "Ноябрь 2023", orders: 25, km: 2890 },
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 stats-bg rounded-lg">
                          <div>
                            <p className="font-medium text-sm text-bright">{item.month}</p>
                            <p className="text-base text-gold">{item.orders} заказов</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm text-bright">{item.km.toLocaleString()} км</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gold">Топ направления</h4>
                    <div className="space-y-3">
                      {[
                        { route: "Москва → СПб", count: 45 },
                        { route: "Москва → Екатеринбург", count: 32 },
                        { route: "СПб → Новосибирск", count: 28 },
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 stats-bg rounded-lg">
                          <div>
                            <p className="font-medium text-sm text-bright">{item.route}</p>
                          </div>
                          <div>
                            <p className="font-medium text-base text-gold">{item.count} рейсов</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
