import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import {Link} from 'react-router-dom'

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md text-black py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left section */}
          <div className="flex items-center space-x-6">
            <Link to='/web/login'>
            <img src="/IslamiaLogo.png" alt="Logo" className="h-16 w-auto" />
            </Link>
            <div className="hidden lg:flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black transition-all font-light">Events</a>
              <a href="#" className="text-gray-600 hover:text-black transition-all font-light">Courses</a>
              <Link to='/contact-us' className="text-gray-600 hover:text-black transition-all font-light">Contact Us</Link>
            </div>
          </div>

          {/* Right section */}
          <div className="hidden lg:flex space-x-4">
            <button className="px-4 py-2 text-gray-600 hover:text-black transition-all font-light cursor-pointer">Sign in</button>
            <Link to='/contact-us' className="text-white px-4 py-2 rounded bg-[#e86262] hover:bg-[#DF4A4A] cursor-pointer">Contact Us</Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <button onClick={() => setOpen(!open)}>
              {open ? <X className="w-6 h-6 cursor-pointer" /> : <Menu className="w-6 h-6 cursor-pointer" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white ${open ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-4 space-y-2">
          <a href="#" className="block py-2 text-gray-600 hover:text-black transition-all font-light">Events</a>
          <a href="#" className="block py-2 text-gray-600 hover:text-black transition-all font-light">Courses</a>
          <a href="#" className="block py-2 text-gray-600 hover:text-black transition-all font-light">Sign Up</a>
          <Link to='/contact-us' className="mt-2 text-white px-4 py-2 rounded bg-[#e86262] hover:bg-[#DF4A4A] cursor-pointer">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
