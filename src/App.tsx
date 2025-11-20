import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    // Telegram Web App SDK will be initialized when needed
    // We'll add proper initialization later when implementing Telegram features
    console.log('Home page loaded');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Маркетплейс</h1>
        <p className="text-gray-600">Добро пожаловать в маркетплейс!</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

