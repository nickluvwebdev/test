// src/components/Layout.tsx
import { Link, Outlet, useNavigate } from 'react-router-dom';
// Import your logo from src/assets
// import logo from '../assets/logo.png'; 

export default function MainLayout() {
  const navigate = useNavigate();

  // This function handles the logout
  const handleLogout = () => {
    // This completes the "Logout function" requirement
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    // We use flex-col and min-h-screen to make the footer stick to the bottom
    <div className="flex flex-col min-h-screen font-sans text-slate-800 bg-white">
      
      {/* HEADER (Nav Bar) */}
      <header className="w-full">
        <nav className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
          {/* Logo */}
          <div>
            <Link to="/home">
              {/*<img src={logo} alt="logo" className="w-10" />/*}
              {/* Placeholder logo until you add yours */}
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div> 
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-700">
            <Link to="#" className="hover:text-blue-600">Invoice</Link>
            <Link to="/quotation" className="hover:text-blue-600">Quotation</Link>
            <Link to="/about" className="hover:text-blue-600">About Us</Link>
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Log out →
            </button>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT
        This <Outlet /> is a placeholder that will be replaced by
        your Home, About, or Quotation page components.
      */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-800 text-white text-center text-xs py-4">
        Use for React Lab @ Faculty of ICT, Mahidol University
      </footer>
    </div>
  );
}