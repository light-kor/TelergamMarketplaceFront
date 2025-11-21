export const config = {
  // Используем относительный путь для API, чтобы работал Vite proxy
  // В production можно указать полный URL через VITE_API_URL
  apiUrl: import.meta.env.VITE_API_URL || '/api',
};

