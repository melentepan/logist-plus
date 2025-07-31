'use client'

import type React from 'react'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderDark,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MessageCircle,
  Send,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Paperclip,
  Smile,
} from 'lucide-react'
import { Navigation } from '@/src/components/Navigation'

interface Message {
  id: number
  text: string
  sender: 'user' | 'support'
  timestamp: Date
  status?: 'sent' | 'delivered' | 'read'
}

interface Ticket {
  id: string
  subject: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  created: Date
  lastUpdate: Date
}

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Здравствуйте! Меня зовут Анна, я ваш персональный менеджер. Как дела? Чем могу помочь?',
      sender: 'support',
      timestamp: new Date(Date.now() - 300000), // 5 минут назад
      status: 'read',
    },
  ])

  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [supportOnline, setSupportOnline] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [tickets] = useState<Ticket[]>([
    {
      id: 'TK-001',
      subject: 'Проблема с отслеживанием груза',
      status: 'in-progress',
      priority: 'high',
      created: new Date(Date.now() - 86400000), // 1 день назад
      lastUpdate: new Date(Date.now() - 3600000), // 1 час назад
    },
    {
      id: 'TK-002',
      subject: 'Вопрос по тарифам',
      status: 'resolved',
      priority: 'medium',
      created: new Date(Date.now() - 172800000), // 2 дня назад
      lastUpdate: new Date(Date.now() - 7200000), // 2 часа назад
    },
  ])

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium',
  })

  // Автоскролл к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Отправка сообщения
  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Имитация ответа поддержки
    setTimeout(() => {
      setIsTyping(false)
      const supportResponses = [
        'Спасибо за ваше сообщение! Я изучаю ваш вопрос и скоро отвечу.',
        'Понял вас. Давайте разберем эту ситуацию подробнее.',
        'Хороший вопрос! Сейчас проверю информацию в системе.',
        'Я передам ваш запрос специалисту. Ответим в течение 15 минут.',
        'Все ясно. Помогу вам решить эту задачу прямо сейчас!',
      ]

      const supportMessage: Message = {
        id: messages.length + 2,
        text: supportResponses[
          Math.floor(Math.random() * supportResponses.length)
        ],
        sender: 'support',
        timestamp: new Date(),
        status: 'read',
      }

      setMessages((prev) => [...prev, supportMessage])
    }, 1500 + Math.random() * 2000) // 1.5-3.5 секунд
  }

  // Отправка формы обратной связи
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Отправка формы:', contactForm)
    // Здесь будет логика отправки формы
    alert('Ваше обращение отправлено! Мы ответим в течение 24 часов.')
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500'
      case 'in-progress':
        return 'bg-yellow-500'
      case 'resolved':
        return 'bg-green-500'
      case 'closed':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-500'
      case 'high':
        return 'text-orange-500'
      case 'medium':
        return 'text-yellow-500'
      case 'low':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className='min-h-screen bg-dark-bg'>
      <Navigation />
      <main className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gold mb-2'>
              Поддержка и обратная связь
            </h1>
            <p className='text-medium'>
              Мы всегда готовы помочь вам решить любые вопросы
            </p>
          </div>

          <Tabs defaultValue='chat' className='space-y-6'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='chat' className='flex items-center gap-2'>
                <MessageCircle className='h-4 w-4' />
                Онлайн чат
              </TabsTrigger>
              <TabsTrigger value='tickets' className='flex items-center gap-2'>
                <AlertCircle className='h-4 w-4' />
                Мои обращения
              </TabsTrigger>
              <TabsTrigger value='contact' className='flex items-center gap-2'>
                <Mail className='h-4 w-4' />
                Обратная связь
              </TabsTrigger>
            </TabsList>

            {/* Онлайн чат */}
            <TabsContent value='chat'>
              <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                {/* Чат */}
                <Card className='lg:col-span-3'>
                  <CardHeaderDark>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <Avatar>
                          <AvatarImage src='/placeholder.svg?height=40&width=40' />
                          <AvatarFallback>АП</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className='text-lg'>
                            Анна Петрова
                          </CardTitle>
                          <CardDescription className='flex items-center gap-2'>
                            <div
                              className={`w-2 h-2 rounded-full ${
                                supportOnline ? 'bg-green-500' : 'bg-gray-500'
                              }`}
                            />
                            {supportOnline ? 'Онлайн' : 'Не в сети'}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant='outline'>Персональный менеджер</Badge>
                    </div>
                  </CardHeaderDark>
                  <CardContent>
                    {/* Область сообщений */}
                    <div className='h-96 overflow-y-auto mb-4 space-y-4 p-4 rounded-lg'>
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === 'user'
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-gold text-dark-bg'
                                : 'bg-dark-bg border'
                            }`}
                          >
                            <p className='text-sm'>{message.text}</p>
                            <div
                              className={`flex items-center justify-between mt-1 text-xs ${
                                message.sender === 'user'
                                  ? 'text-dark-bg/70'
                                  : 'text-gray-500'
                              }`}
                            >
                              <span>{formatTime(message.timestamp)}</span>
                              {message.sender === 'user' && message.status && (
                                <CheckCircle className='h-3 w-3 ml-1' />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Индикатор печатания */}
                      {isTyping && (
                        <div className='flex justify-start'>
                          <div className='bg-white border px-4 py-2 rounded-lg'>
                            <div className='flex space-x-1'>
                              <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                              <div
                                className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                                style={{ animationDelay: '0.1s' }}
                              ></div>
                              <div
                                className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                                style={{ animationDelay: '0.2s' }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Поле ввода */}
                    <div className='flex items-center gap-2'>
                      <Button variant='outline' size='sm'>
                        <Paperclip className='h-4 w-4' />
                      </Button>
                      <Button variant='outline' size='sm'>
                        <Smile className='h-4 w-4' />
                      </Button>
                      <Input
                        placeholder='Введите сообщение...'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === 'Enter' && handleSendMessage()
                        }
                        className='flex-1 focus:border-gold focus:ring-2 focus:ring-gold/20'
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className='h-4 w-4' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Боковая панель */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>Быстрые действия</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <Button
                      variant='outline'
                      className='w-full justify-start bg-transparent'
                    >
                      <Phone className='mr-2 h-4 w-4' />
                      Заказать звонок
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full justify-start bg-transparent'
                    >
                      <Mail className='mr-2 h-4 w-4' />
                      Написать email
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full justify-start bg-transparent'
                    >
                      <Clock className='mr-2 h-4 w-4' />
                      Запланировать встречу
                    </Button>

                    <div className='pt-4 border-t'>
                      <h4 className='font-medium mb-2 text-gold'>
                        Часы работы
                      </h4>
                      <div className='text-sm text-bright space-y-1'>
                        <div>Пн-Пт: 9:00 - 18:00</div>
                        <div>Сб: 10:00 - 16:00</div>
                        <div>Вс: выходной</div>
                      </div>
                    </div>

                    <div className='pt-4 border-t'>
                      <h4 className='font-medium mb-2 text-gold'>Контакты</h4>
                      <div className='text-sm text-bright space-y-1'>
                        <div>+7 (495) 123-45-67</div>
                        <div>support@logist.plus</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Мои обращения */}
            <TabsContent value='tickets'>
              <Card>
                <CardHeader>
                  <CardTitle>История обращений</CardTitle>
                  <CardDescription>
                    Все ваши запросы в службу поддержки
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className='border rounded-lg p-4'>
                        <div className='flex items-center justify-between mb-3'>
                          <div className='flex items-center gap-3'>
                            <Badge variant='outline'>{ticket.id}</Badge>
                            <div
                              className={`w-2 h-2 rounded-full ${getStatusColor(
                                ticket.status
                              )}`}
                            />
                            <span className='font-medium'>
                              {ticket.subject}
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <span
                              className={`text-sm font-medium ${getPriorityColor(
                                ticket.priority
                              )}`}
                            >
                              {ticket.priority.toUpperCase()}
                            </span>
                            <Badge
                              variant={
                                ticket.status === 'resolved'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {ticket.status === 'open' && 'Открыт'}
                              {ticket.status === 'in-progress' && 'В работе'}
                              {ticket.status === 'resolved' && 'Решен'}
                              {ticket.status === 'closed' && 'Закрыт'}
                            </Badge>
                          </div>
                        </div>

                        <div className='flex items-center justify-between text-sm text-bright'>
                          <span>
                            Создан: {ticket.created.toLocaleDateString('ru-RU')}
                          </span>
                          <span>
                            Обновлен:{' '}
                            {ticket.lastUpdate.toLocaleDateString('ru-RU')}
                          </span>
                        </div>

                        <div className='mt-3 flex gap-2'>
                          <Button variant='outline' size='sm'>
                            Открыть
                          </Button>
                          <Button variant='outline' size='sm'>
                            Добавить комментарий
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Форма обратной связи */}
            <TabsContent value='contact'>
              <Card>
                <CardHeader>
                  <CardTitle>Создать новое обращение</CardTitle>
                  <CardDescription>
                    Опишите вашу проблему или вопрос подробно
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitForm} className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='name'>Ваше имя</Label>
                        <Input
                          id='name'
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              name: e.target.value,
                            })
                          }
                          className='focus:border-gold focus:ring-2 focus:ring-gold/20'
                          required
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          type='email'
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              email: e.target.value,
                            })
                          }
                          className='focus:border-gold focus:ring-2 focus:ring-gold/20'
                          required
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='subject'>Тема обращения</Label>
                      <Input
                        id='subject'
                        value={contactForm.subject}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            subject: e.target.value,
                          })
                        }
                        className='focus:border-gold focus:ring-2 focus:ring-gold/20'
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='priority'>Приоритет</Label>
                      <select
                        id='priority'
                        value={contactForm.priority}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            priority: e.target.value,
                          })
                        }
                        className='w-full px-3 py-2 border border-input bg-background rounded-md focus:border-gold focus:ring-2 focus:ring-gold/20'
                      >
                        <option value='low'>Низкий</option>
                        <option value='medium'>Средний</option>
                        <option value='high'>Высокий</option>
                        <option value='urgent'>Срочный</option>
                      </select>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='message'>Сообщение</Label>
                      <Textarea
                        id='message'
                        rows={6}
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                        className='focus:border-gold focus:ring-2 focus:ring-gold/20'
                        placeholder='Опишите вашу проблему или вопрос подробно...'
                        required
                      />
                    </div>

                    <Button
                      type='submit'
                      size='lg'
                      className='w-full md:w-auto'
                    >
                      <Send className='mr-2 h-4 w-4' />
                      Отправить обращение
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
