// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Quotation from './pages/Quotation'
import CreateQuotation from './pages/CreateQuotation'
import About from './pages/About'
import MainLayout from '@/components/Layout' // <-- 1. IMPORT YOUR LAYOUT

function App() {
  return (
    <Routes>
      {/* 2. ADDED THE REDIRECT BACK TO /home */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      
      {/* 3. The Login page has no nav bar, so it's separate. */}
      <Route path="/login" element={<Login />} />

      {/* 4. This special <Route> wraps all child pages with the MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/quotation/create" element={<CreateQuotation />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App