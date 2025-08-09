'use client'

import type React from 'react'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
} from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { GradientBackground } from '@/components/gradient-background'
import { APP_CONFIG } from '@/lib/config'

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
        return 'bg-gold'
      case 'in-progress':
        return 'bg-gold'
      case 'resolved':
        return 'bg-success'
      case 'closed':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-error'
      case 'high':
        return 'text-orange-500'
      case 'medium':
        return 'text-gold'
      case 'low':
        return 'text-success'
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

  // Получение инициалов для аватара
  const getInitials = (name: string) => {
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <div className='min-h-screen bg-light-bg'>
      <GradientBackground />
      <Navigation />

      <main className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gold mb-2'>
              Поддержка и обратная связь
            </h1>
            <p className='text-dark-text'>
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
                <Card className='lg:col-span-3 bg-card-bg border-gray-200'>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <Avatar className='hidden sm:flex'>
                          {/* Использование инициалов для аватара */}
                          <AvatarFallback className='bg-gold text-dark-text'>
                            {getInitials('Анна Петрова')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className='text-lg text-gold'>
                            Анна Петрова
                          </CardTitle>
                          <CardDescription className='flex items-center gap-2 text-light-text'>
                            <div
                              className={`w-2 h-2 rounded-full ${
                                supportOnline ? 'bg-success' : 'bg-gray-500'
                              }`}
                            />
                            {supportOnline ? 'Онлайн' : 'Не в сети'}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant='outline'
                        className='border-gold text-gold'
                      >
                        Персональный менеджер
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Область сообщений */}
                    <div className='h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg'>
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
                                ? 'bg-gold text-dark-text'
                                : 'bg-white border border-gray-200 text-dark-text'
                            }`}
                          >
                            <p className='text-sm'>{message.text}</p>
                            <div
                              className={`flex items-center justify-end mt-1 text-xs ${
                                message.sender === 'user'
                                  ? 'text-dark-text/70'
                                  : 'text-gray-500'
                              }`}
                            >
                              {/* Отступ между временем и значком прочитано */}
                              <span className='mr-2'>
                                {formatTime(message.timestamp)}
                              </span>
                              {message.sender === 'user' && message.status && (
                                <CheckCircle className='h-3 w-3' />
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
                      {/* Кнопка скрепки акцентного цвета с черной иконкой */}
                      <Button
                        className='bg-gold hover:bg-gold-hover text-dark-text'
                        size='sm'
                      >
                        <Paperclip className='h-4 w-4' />
                      </Button>
                      <Input
                        placeholder='Введите сообщение...'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === 'Enter' && handleSendMessage()
                        }
                        className='flex-1 bg-white text-dark-text border-gray-300 focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-gray-400'
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className='bg-gold hover:bg-gold-hover text-dark-text'
                      >
                        <Send className='h-4 w-4' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Боковая панель */}
                <Card className='bg-card-bg border-gray-200'>
                  <CardHeader>
                    <CardTitle className='text-lg text-gold'>
                      Быстрые действия
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    {/* Уменьшен отступ между иконкой и текстом */}
                    <Button
                      variant='outline'
                      className='w-full justify-start border-gold text-gold hover:bg-gold hover:text-dark-text bg-transparent'
                    >
                      <Phone className='h-4 w-4' />
                      Заказать звонок
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full justify-start border-gold text-gold hover:bg-gold hover:text-dark-text bg-transparent'
                    >
                      <Mail className='h-4 w-4' />
                      Написать email
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full justify-start border-gold text-gold hover:bg-gold hover:text-dark-text bg-transparent'
                    >
                      <Clock className='h-4 w-4' />
                      Запланировать встречу
                    </Button>

                    <div className='pt-4 border-t border-gold'>
                      <h4 className='font-medium mb-2 text-gold'>
                        Часы работы
                      </h4>
                      <div className='text-sm text-light-text space-y-1'>
                        <div>{APP_CONFIG.contacts.workingHours.weekdays}</div>
                        <div>{APP_CONFIG.contacts.workingHours.saturday}</div>
                        <div>{APP_CONFIG.contacts.workingHours.sunday}</div>
                      </div>
                    </div>

                    <div className='pt-4 border-t border-gold'>
                      <h4 className='font-medium mb-2 text-gold'>Контакты</h4>
                      <div className='text-sm text-light-text space-y-1'>
                        <div>{APP_CONFIG.contacts.phone}</div>
                        <div>{APP_CONFIG.contacts.email}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Мои обращения */}
            <TabsContent value='tickets'>
              <Card className='bg-card-bg border-gray-200'>
                <CardHeader>
                  <CardTitle className='text-gold'>История обращений</CardTitle>
                  <CardDescription className='text-light-text'>
                    Все ваши запросы в службу поддержки
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className='border-2 border-gold rounded-lg p-4 bg-card-bg'
                      >
                        <div className='flex items-center justify-between mb-3'>
                          <div className='flex items-center gap-3'>
                            <Badge
                              variant='outline'
                              className='border-gold text-gold'
                            >
                              {ticket.id}
                            </Badge>
                            <div
                              className={`w-2 h-2 rounded-full ${getStatusColor(
                                ticket.status
                              )}`}
                            />
                            <span className='font-medium text-light-text'>
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

                        <div className='flex items-center justify-between text-sm text-gray-300'>
                          <span>
                            Создан: {ticket.created.toLocaleDateString('ru-RU')}
                          </span>
                          <span>
                            Обновлен:{' '}
                            {ticket.lastUpdate.toLocaleDateString('ru-RU')}
                          </span>
                        </div>

                        <div className='mt-3 flex gap-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='border-gold bg-gold hover:bg-gold-hover text-dark-text'
                          >
                            Открыть
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='border-gold bg-gold hover:bg-gold-hover text-dark-text'
                          >
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
              <Card className='bg-card-bg border-gray-200'>
                <CardHeader>
                  <CardTitle className='text-gold'>
                    Создать новое обращение
                  </CardTitle>
                  <CardDescription className='text-light-text'>
                    Опишите вашу проблему или вопрос подробно
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitForm} className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='name' className='text-light-text'>
                          Ваше имя
                        </Label>
                        <Input
                          id='name'
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              name: e.target.value,
                            })
                          }
                          className='bg-white text-dark-text border-gray-300 focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-gray-400'
                          required
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='email' className='text-light-text'>
                          Email
                        </Label>
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
                          className='bg-white text-dark-text border-gray-300 focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-gray-400'
                          required
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='subject' className='text-light-text'>
                        Тема обращения
                      </Label>
                      <Input
                        id='subject'
                        value={contactForm.subject}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            subject: e.target.value,
                          })
                        }
                        className='bg-white text-dark-text border-gray-300 focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-gray-400'
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='priority' className='text-light-text'>
                        Приоритет
                      </Label>
                      <select
                        id='priority'
                        value={contactForm.priority}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            priority: e.target.value,
                          })
                        }
                        className='w-full px-3 py-2 border border-gray-300 bg-white text-dark-text rounded-md focus:border-gold focus:ring-2 focus:ring-gold/20'
                      >
                        <option value='low'>Низкий</option>
                        <option value='medium'>Средний</option>
                        <option value='high'>Высокий</option>
                        <option value='urgent'>Срочный</option>
                      </select>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='message' className='text-light-text'>
                        Сообщение
                      </Label>
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
                        className='bg-white text-dark-text border-gray-300 focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-gray-400'
                        placeholder='Опишите вашу проблему или вопрос подробно...'
                        required
                      />
                    </div>

                    <Button
                      type='submit'
                      size='lg'
                      className='w-full md:w-auto bg-gold hover:bg-gold-hover text-dark-text'
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
