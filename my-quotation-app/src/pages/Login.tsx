// src/pages/Login.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

// --- IMPORTANT ---
// 1. ADD THESE TWO IMPORT LINES
import bg from '../assets/bg.png';
import logo from '../assets/logo.png';
// --- END OF NEW LINES ---

export default function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    // ... (your existing handleSubmit code)
    event.preventDefault();
    setError('');
    console.log("Form submitted with:", { email, password });
    
    try {
      const response = await axios.post('http://203.159.93.114:3100/auth/login', {
        email: email,
        password: password,
      });

      console.log('API Response:', response.data); 

      if (response.data && response.data.access_token && response.data.userId) {
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('userId', String(response.data.userId)); // Save userId as a string
        
        console.log('Login successful! Token and userId saved.');
        navigate('/home');
      } else {
        setError('Login failed: Incomplete data received.');
      }

    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 font-sans">
      {/* Banner */}
      <header className="relative">
        <div
          className="h-56 bg-cover bg-center flex items-center justify-center"
          // 2. ADD THE STYLE ATTRIBUTE HERE
          style={{ backgroundImage: `url(${bg})` }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white px-4 py-2 rounded">
            Financial Management System
          </h1>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex items-center justify-center py-12 px-4">
        <section className="w-full max-w-md bg-white rounded-xl shadow p-8">
          {/* Logo + Title */}
          <div className="text-center mb-8">
            {/* 3. ADD THE LOGO SRC HERE */}
            <img src={logo} alt="Logo" className="mx-auto w-12 mb-4" />
            <h2 className="text-xl font-bold">Sign in to your account</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ... (rest of your form) ... */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input id="email" type="email" required autoComplete="email"
                className="mt-2 block w-full rounded-lg bg-gray-100 border border-gray-300 px-2 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="#" className="text-sm text-blue-600 hover:text-blue-500">Forgot password?</Link>
              </div>
              <input id="password" type="password" required autoComplete="current-password"
                className="mt-2 block w-full rounded-lg bg-gray-100 border border-gray-300 px-2 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
            <div>
              <button type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-lg bg-blue-600 text-white font-medium text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Sign in
              </button>
            </div>
          </form>

          {/* Footer text */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?
            <Link to="#" className="font-medium text-blue-600 hover:text-blue-500"> Start a 14 day free trial</Link>
          </p>
        </section>
      </main>
    </div>
  );
}