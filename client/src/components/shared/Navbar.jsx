import { useState } from 'react'
import { Menu, X } from 'lucide-react'
 
function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 text-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        {/* Left section: Logo + Menu */}
        <div className="flex items-center space-x-6">
          <img src="/IslamiaLogo.png" alt="Logo" className="h-10 w-auto" />
          <div className="hidden lg:flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-500">Events</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Courses</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Contact Us</a>
          </div>
        </div>

        {/* Right section: Buttons */}
        <div className="hidden lg:flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">Contact Us</button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {open && (
      <div className="lg:hidden bg-white px-4 pb-4 pt-2 shadow-md">
        <a href="#" className="block py-2 text-gray-700 hover:text-blue-500">Events</a>
        <a href="#" className="block py-2 text-gray-700 hover:text-blue-500">Courses</a>
        <a href="#" className="block py-2 text-gray-700 hover:text-blue-500">Contact Us</a>
        <a href="#" className="block py-2 text-gray-700 hover:text-blue-500">Sign Up</a>
      </div>
    )}
  </nav>
  )
}

export default Navbar