// src/components/Layout.tsx
import { Link, Outlet } from 'react-router-dom';
// Import your logo asset
// import logo from '../assets/logo.png'; 

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800 bg-white">
      <header className="w-full">
        <nav className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
          {/* Logo */}
          <div>
            <Link to="/home">
              {/* <img src={logo} alt="logo" className="w-10" /> */}
              {/* Placeholder logo if you don't have the asset yet */}
              <div className="w-10 h-10 bg-gray-200 rounded"></div>
            </Link>
          </div>
          {/* Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-700">
            <Link to="#" className="hover:text-blue-600">Invoice</Link>
            <Link to="/quotation" className="hover:text-blue-600">Quotation</Link>
            <Link to="/about" className="hover:text-blue-600">About Us</Link>
          </div>
          {/* Logout */}
          <div>
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600">
              Log out →
            </Link>
            {/* We will add the real logout logic later */}
          </div>
        </nav>
      </header>

      {/* This Outlet renders the specific page (Home, About, etc.) */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center text-xs py-3 mt-auto">
        Use for React Lab @ Faculty of ICT, Mahidol University
      </footer>
    </div>
  );
}