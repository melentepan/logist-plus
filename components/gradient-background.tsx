// Компонент декоративного градиентного фона
// Создает три размытых цветных пятна для визуального эффекта
export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Основной светлый фон */}
      <div className="absolute inset-0 bg-light-bg" />

      {/* Золотое пятно в верхней левой части */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      {/* Зеленое пятно в нижней правой части */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl" />

      {/* Желтое пятно в центре */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
    </div>
  )
}
