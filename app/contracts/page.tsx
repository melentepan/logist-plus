'use client'

import type React from 'react'

import { useState, useRef } from 'react'
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
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { GradientBackground } from '@/components/gradient-background'

export default function ContractsPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file)
      setIsPreviewOpen(true)
      setIsSigned(false)
    } else {
      alert('Пожалуйста, загрузите PDF файл')
    }
  }

  const handleSign = () => {
    if (uploadedFile) {
      setIsSigned(true)
      console.log('Документ подписан:', uploadedFile.name)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='min-h-screen bg-light-bg'>
      <GradientBackground />
      <Navigation />

      <main className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gold mb-2'>
              Электронные договоры
            </h1>
            <p className='text-dark-text'>
              Загрузка, просмотр и подписание договоров с помощью ЭЦП
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Загрузка документа */}
            <Card className='bg-card-bg border-gray-200'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-gold'>
                  <Upload className='h-5 w-5' />
                  Загрузка документа
                </CardTitle>
                <CardDescription className='text-light-text'>
                  Загрузите PDF файл договора для подписания
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='contract-file' className='text-light-text'>
                    Файл договора
                  </Label>
                  <Input
                    id='contract-file'
                    type='file'
                    accept='.pdf'
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    className='hidden'
                  />
                  <div
                    onClick={handleUploadClick}
                    className='border-2 border-dashed border-gold rounded-lg p-8 text-center cursor-pointer hover:border-gold-hover transition-colors bg-card-bg'
                  >
                    <Upload className='h-12 w-12 text-gold mx-auto mb-4' />
                    <p className='text-lg font-medium text-light-text mb-2'>
                      Нажмите для загрузки файла
                    </p>
                    <p className='text-sm text-gray-300'>
                      Поддерживаются только PDF файлы
                    </p>
                  </div>
                </div>

                {uploadedFile && (
                  <Alert className='border-gold bg-card-bg'>
                    <FileText className='h-4 w-4 text-gold' />
                    <AlertDescription className='text-light-text'>
                      Загружен файл: <strong>{uploadedFile.name}</strong>
                      <br />
                      Размер: {(uploadedFile.size / 1024 / 1024).toFixed(2)} МБ
                    </AlertDescription>
                  </Alert>
                )}

                {uploadedFile && !isSigned && (
                  <Button
                    onClick={handleSign}
                    className='w-full bg-gold hover:bg-gold-hover text-dark-text'
                    size='lg'
                  >
                    <CheckCircle className='mr-2 h-4 w-4' />
                    Подписать ЭЦП
                  </Button>
                )}

                {isSigned && (
                  <Alert className='border-success bg-card-bg'>
                    <CheckCircle className='h-4 w-4 text-success' />
                    <AlertDescription className='text-success'>
                      Документ успешно подписан электронной цифровой подписью
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Просмотр документа */}
            <Card className='bg-card-bg border-gray-200'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-gold'>
                  <FileText className='h-5 w-5' />
                  Просмотр документа
                </CardTitle>
                <CardDescription className='text-light-text'>
                  {uploadedFile
                    ? 'Предварительный просмотр загруженного документа'
                    : 'Загрузите документ для просмотра'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadedFile ? (
                  <div className='space-y-4'>
                    <div className='bg-gray-100 rounded-lg h-96 flex items-center justify-center relative overflow-hidden'>
                      <img
                        src='/placeholder.svg?height=400&width=300'
                        alt='Предварительный просмотр PDF документа'
                        className='w-full h-full object-contain'
                      />
                      <div className='absolute inset-0 bg-white/80 flex items-center justify-center'>
                        <div className='text-center'>
                          <FileText className='h-16 w-16 text-gold mx-auto mb-4' />
                          <p className='text-lg font-medium text-gray-700 mb-2'>
                            Предварительный просмотр
                          </p>
                          <p className='text-sm text-gray-600 mb-4'>
                            {uploadedFile.name}
                          </p>
                          {isSigned && (
                            <div className='inline-flex items-center gap-2 bg-success/20 text-success px-3 py-1 rounded-full text-sm'>
                              <CheckCircle className='h-4 w-4' />
                              Подписано ЭЦП
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <Button
                        variant='outline'
                        className='flex-1 border-gold text-gold hover:bg-gold hover:text-dark-text bg-transparent'
                      >
                        Скачать
                      </Button>
                      <Button
                        variant='outline'
                        className='flex-1 border-gold text-gold hover:bg-gold hover:text-dark-text bg-transparent'
                      >
                        Печать
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className='bg-card-bg border border-gold rounded-lg h-96 flex items-center justify-center'>
                    <div className='text-center'>
                      <AlertCircle className='h-12 w-12 text-gold mx-auto mb-4' />
                      <p className='text-light-text'>
                        Загрузите PDF файл для просмотра
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* История подписанных документов */}
          <Card className='mt-8 bg-card-bg border-gray-200'>
            <CardHeader>
              <CardTitle className='text-gold'>История документов</CardTitle>
              <CardDescription className='text-light-text'>
                Ранее подписанные договоры и документы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[
                  {
                    name: 'Договор перевозки №001',
                    date: '15.01.2024',
                    status: 'Подписан',
                  },
                  {
                    name: 'Договор страхования №045',
                    date: '12.01.2024',
                    status: 'Подписан',
                  },
                  {
                    name: 'Соглашение о сотрудничестве',
                    date: '08.01.2024',
                    status: 'Подписан',
                  },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-4 border border-gold rounded-lg bg-card-bg'
                  >
                    <div className='flex items-center gap-3'>
                      <FileText className='h-5 w-5 text-gold' />
                      <div>
                        <p className='font-medium text-light-text'>
                          {doc.name}
                        </p>
                        <p className='text-sm text-gray-300'>
                          Дата подписания: {doc.date}
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-3'>
                      <div className='flex items-center gap-1'>
                        <CheckCircle className='h-4 w-4 text-success' />
                        <span className='text-sm text-success'>
                          {doc.status}
                        </span>
                      </div>
                      <Button
                        variant='outline'
                        size='sm'
                        className='bg-gold text-dark-text border-gold hover:bg-gold-hover'
                      >
                        Скачать
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
