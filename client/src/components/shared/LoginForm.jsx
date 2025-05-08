import { Link } from "react-router-dom"


function LoginForm() {
  return (
    <div className="max-w-7xl mx-auto">
    <div className="lg:max-w-[25%] md:max-w-[30%] max-w-full px-5 md:px-0 mx-auto">
     
      <div className="relative mb-4 mt-32">
        <label htmlFor="email" className="leading-7 text-sm text-black font-semibold">Email</label>
        <input type="email" placeholder="Email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-[#f48787b5] focus:ring-2 focus:ring-[#eb777782] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>


      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-black font-semibold ">Password</label>
        <input type="password" placeholder="Password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-[#f48787b5] focus:ring-2 focus:ring-[#eb777782] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
      <div>
      <button className="w-full mt-2 text-white px-4 py-2 rounded bg-[#e86262] hover:bg-[#DF4A4A] cursor-pointer">
            Login
          </button>
      </div>
      <div>
        <Link to='/web/login' className="mt-3 text-[#e86262] text-[12px] hover:text-[#a14848] hover:underline">Reset password</Link>
      </div>
    </div>
    </div>
  )
}

export default LoginForm