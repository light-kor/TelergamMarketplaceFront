import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdsList } from './pages/AdsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

