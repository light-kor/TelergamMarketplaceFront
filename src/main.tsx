import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// Инициализация Telegram Web App
if (window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  
  // Применяем тему Telegram
  if (tg.themeParams.bg_color) {
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color);
  }
  if (tg.themeParams.text_color) {
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color);
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);

