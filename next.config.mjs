/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Включаем статический экспорт
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Для GitHub Pages нужно отключить оптимизацию изображений
  },
  // Если вы размещаете не в корне домена, а в подпапке (например, username.github.io/logistics-platform)
  // раскомментируйте следующую строку и укажите имя вашего репозитория
  basePath: '/logist-plus',
  assetPrefix: '/logist-plus',
}

export default nextConfig
