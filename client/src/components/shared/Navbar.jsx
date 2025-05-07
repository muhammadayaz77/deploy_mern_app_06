import { useState } from 'react'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 text-black py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left section */}
          <div className="flex items-center space-x-6">
            <img src="/IslamiaLogo.png" alt="Logo" className="h-16 w-auto" />
            <div className="hidden lg:flex space-x-4">
              <a href="#" className=" text-gray-600 hover:text-black transition-all font-light">Events</a>
              <a href="#" className=" text-gray-600 hover:text-black transition-all font-light">Courses</a>
              <a href="#" className=" text-gray-600 hover:text-black transition-all font-light">Contact Us</a>
            </div>
          </div>

          {/* Right section */}
          <div className="hidden lg:flex space-x-4">
            <button className="px-4 py-2 text-gray-600 hover:text-black transition-all font-light cursor-pointer">Sign in</button>
            <button className=" text-white px-4 py-2 rounded bg-[#e86262] hover:bg-[#DF4A4A] cursor-pointer">Contact Us</button>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <button onClick={() => setOpen(!open)}>
              {open ? <X className="w-6 h-6 cursor-pointer" /> : <Menu className="w-6 h-6 cursor-pointer" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu with smooth transition */}
      <div
        className={`lg:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          <a href="#" className="block py-2  text-gray-600 hover:text-black transition-all font-light">Events</a>
          <a href="#" className="block py-2  text-gray-600 hover:text-black transition-all font-light">Courses</a>
          <a href="#" className="block py-2  text-gray-600 hover:text-black transition-all font-light cursor-pointer">Sign Up</a>

          {/* Centered Contact Us button */}
          <button className="mt-2 text-white px-4 py-2 rounded bg-[#e86262] hover:bg-[#DF4A4A] cursor-pointer">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
