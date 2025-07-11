import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_API_ENDPOINT } from "../../utils/constants";
import axios from 'axios'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slices/authSlice";


function  LoginForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(null);
  let [loading,setLoading] = useState(false);

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
          <input
            type="password"
            placeholder="Password"
            id="password"
            {...register("password", { required: true })}
            className="w-full bg-white rounded border border-gray-300 focus:border-[#f48787b5] focus:ring-2 focus:ring-[#eb777782] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
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
