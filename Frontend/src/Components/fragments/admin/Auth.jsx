import React, { useState } from 'react';
import Logo from '../../../assets/bg.jpg';
import {loginUser} from './services/api.js'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      console.log('Login successful:', result); 
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil',
        text: 'Selamat datang admin terbaik!!',
        confirmButtonText: 'Lanjutkan',
        customClass: {
          confirmButton: 'bg-emerald-500 text-white hover:bg-emerald-600 px-4 py-2 rounded', 
        },
      }).then(() => {
        navigate('/admin');
      });
      localStorage.setItem('token', result.token);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/2 w-full h-64 md:h-auto relative">
        <img
          src={Logo}
          alt="Studio Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center">
            <span className="text-[#0680D7]">Welcome to</span> <br />
            <span className="text-black">Admin Pages</span>
          </h1>
        </div>
      </div>

      <div className="md:w-1/2 w-full bg-[#232323] flex items-center justify-center px-8 py-12">
        <form className="p-6 rounded-lg w-full max-w-sm" onSubmit={handleLogin}>
          <h2 className="text-white text-[24px] sm:text-[26px] md:text-[30px] font-bold mb-8 md:mb-14 text-center">
            Login
          </h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[18px] md:text-[20px] text-[#FFF9F9] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white text-black placeholder:text-gray-400 p-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[18px] md:text-[20px] text-[#FFF9F9] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white text-black placeholder:text-gray-400 p-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4 text-left">
            <a href="#" className="text-[15px] sm:text-[17px] text-blue-500 hover:underline">
              Lupa Password?
            </a>
          </div>
          <div className="flex items-center justify-center">
          <button type="submit" disabled={loading} className=' bg-blue-500 hover:bg-blue-600 text-white py-2 px-14 sm:px-14 text-[18px] sm:text-[20px] md:text-[23px] rounded-3xl transition'>
          {loading ? 'Logging in...' : 'Login'}
        </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
