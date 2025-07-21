import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_API_ENDPOINT } from "../../utils/constants";
import axios from 'axios'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slices/authSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(null);
  let [loading,setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const onSubmit = async(data) => {
    // Here, send the data to backend API using fetch/axios
      setLoading(true);
      await axios.post(AUTH_API_ENDPOINT,data,{
        headers : {
          "Content-Type" : 'application/json'
        },
        withCredentials : true
      })
      .then(res => {
        dispatch(setUser(res.data))
        window.toastify(res?.data?.message || 'You are logged in','success')
        // console.log('res : ',res.data.user.role)
        if(res.data.user?.role === 'student'){
          navigate('/student/result')
        }
        else if(res.data.user?.role === 'sup_admin'){
          navigate('/sup-admin/create-admin')
        }
        else if(res.data.user?.role === 'admin1'){
          navigate('/admin/assign-class/')
        }
        else if(res.data.user?.role === 'admin2'){
          navigate('/admin/get/classes')
        }
        else if(res.data.user?.role === 'teacher'){
          navigate('/teacher/add-marks')
        }
      })
      .catch(err => {
        console.log(err)
        window.toastify(err?.response?.data.message || 'Log in failed!','error')

      })
      .finally(() => {
        setLoading(false)
      })
  };

  return (
    <div className="max-w-7xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:max-w-[25%] md:max-w-[30%] max-w-full px-5 md:px-0 mx-auto"
      >
        <div className="relative mb-4 mt-32">
          <label htmlFor="email" className="leading-7 text-sm text-black font-semibold">
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            {...register("email", { required: true })}
            className="w-full bg-white rounded border border-gray-300 focus:border-[#f48787b5] focus:ring-2 focus:ring-[#eb777782] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-black font-semibold">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              {...register("password", { required: true })}
              className="w-full bg-white rounded border border-gray-300 focus:border-[#f48787b5] focus:ring-2 focus:ring-[#eb777782] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className={`w-full mt-2 text-white px-4 py-2 rounded bg-[#e86262] hover:bg-[#DF4A4A] ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {
              loading ?  
              <div>
                <span className="loading loading-spinner loading-sm"></span> <span>Loading...</span>
              </div>
              : 'Login'
            }
          </button>
        </div>

        <div>
          <Link to="/web/login" className="mt-3 text-[#e86262] text-[12px] hover:text-[#a14848] hover:underline">
            Reset password
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;