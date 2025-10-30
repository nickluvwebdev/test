// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Quotation from './pages/Quotation';
import CreateQuotation from './pages/CreateQuotation';
import About from './pages/About';

// Import your new layout
import MainLayout from './components/Layout'; 

function App() {
  return (
    <Routes>
      {/* Routes outside the main layout (e.g., Login) */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Routes *inside* the main layout */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/quotation/create" element={<CreateQuotation />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;