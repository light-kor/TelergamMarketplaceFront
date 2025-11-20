# TelergamMarketplaceFront

Frontend для Telegram Marketplace Mini App

## Технологии

- **React** + **TypeScript**
- **Vite** - сборщик
- **React Router** - маршрутизация
- **TanStack Query** - работа с API
- **Zustand** - управление состоянием
- **Tailwind CSS** - стилизация
- **@twa-dev/sdk** - Telegram Mini App SDK

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

3. Настройте `VITE_API_URL` в `.env` (URL вашего бэкенда)

## Запуск

### Разработка
```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

### Production
```bash
npm run build
npm run preview
```

## Структура проекта

```
src/
  ├── components/    # React компоненты (будет добавлено)
  ├── pages/        # Страницы (будет добавлено)
  ├── hooks/        # Custom hooks (будет добавлено)
  ├── store/        # Zustand store (будет добавлено)
  ├── api/          # API клиент (будет добавлено)
  ├── config.ts     # Конфигурация
  ├── App.tsx       # Главный компонент
  └── main.tsx      # Точка входа
```

## TODO

- [ ] Компоненты для отображения объявлений
- [ ] Страницы: список, детали, создание объявления
- [ ] Фильтры по категориям и городам
- [ ] Интеграция с Telegram Web App API
- [ ] Загрузка изображений
- [ ] Адаптивный дизайн
