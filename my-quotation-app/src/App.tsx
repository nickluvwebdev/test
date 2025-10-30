import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Quotation from './pages/Quotation'
import CreateQuotation from './pages/CreateQuotation'
import About from './pages/About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/quotation" element={<Quotation />} />
      <Route path="/quotation/create" element={<CreateQuotation />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App
