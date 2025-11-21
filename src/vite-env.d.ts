/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Telegram Web App API types
interface TelegramWebApp {
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  ready(): void;
  expand(): void;
  close(): void;
  BackButton: {
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
  };
  MainButton: {
    show(): void;
    hide(): void;
    setText(text: string): void;
    onClick(callback: () => void): void;
  };
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    auth_date: number;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}

