import React from 'react'
import Logo from '../../../assets/bg.jpg'

const Auth = () => {
  return (
    <div className="flex flex-col lg:flex-row px-6 md:px-20 lg:px-36 py-12 lg:py-20 h-auto lg:h-[660px]">
  <div className="lg:w-1/2 w-full h-64 lg:h-auto relative lg:mb-0">
    <img
      src={Logo}
      alt="Studio Background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center px-4">
        <span className="text-[#0680D7]">Welcome to</span> <br />
        <span className="text-black">Admin Pages</span>
      </h1>
    </div>
  </div>

  <div className="lg:w-1/2 w-full bg-[#232323] flex items-center justify-center px-6 py-8 lg:px-8 lg:py-12">
    <form className="p-4 md:p-6 rounded-lg w-full max-w-sm">
      <h2 className="text-white text-[24px] sm:text-[26px] md:text-[30px] font-bold mb-8 md:mb-14 text-center">
        Login
      </h2>
      <div className="mb-6 md:mb-10">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[18px] md:text-[20px] text-[#FFF9F9] mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
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
        <button
          type="submit"
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-10 sm:px-14 text-[18px] sm:text-[20px] md:text-[23px] rounded-3xl transition"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</div>

  )
}

export default Auth


