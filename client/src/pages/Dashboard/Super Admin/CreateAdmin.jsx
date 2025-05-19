  import React from 'react';
  import { useForm } from 'react-hook-form';
  import SubNavDashboard from '../../../components/dashboard/SubNavDashboard';
  import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
  import { Label } from "@/components/ui/label";
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
  import axios from 'axios';
  import { REGISTER_API_ENDPOINT } from '../../../utils/constants';
  import { useDispatch } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
  import { setAddAdmin } from '../../../redux/Slices/adminSlice';

  function CreateAdmin() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      reset,
      setValue, // Add this
    } = useForm({
      defaultValues: {
        name: '',
        email: '',
        password: '',
        role: 'admin1' // Set default here
      }
    });

    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(null)

    const onSubmit = async (data) => {
      setIsLoading(true);
      await axios.post(REGISTER_API_ENDPOINT,data,{
        headers : {
          "Content-Type" : 'application/json'
        },
        withCredentials : true
      })
      .then(res => {
        window.toastify(res.data.message,'success')
        dispatch(setAddAdmin(res.data.data));
        navigate('/sup-admin/manage-admin')
        reset();
      })
      .catch(err => {
        window.toastify(err.response.data.message,'error')
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
    };

    return (
      <div className=''>
        <SubNavDashboard />
        <form onSubmit={handleSubmit(onSubmit)} className='lg:w-[30%] md:w-[60%] mx-10 mt-10'>
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <FaUser className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </span>
              <input
                id="username"
                type="text"
                autoComplete='current-password'
                {...register('name', { required: 'Username is required' })}
                className={`bg-gray-50 border border-l-0 text-gray-900 focus:ring-2 focus:ring-transparent block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 rounded-r-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-transparent focus:outline-none ${
                  errors.name ? 'border-red-500' : ''
                }`}
                placeholder="Muhammad Ayaz"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <FaEnvelope className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </span>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={`bg-gray-50 border border-l-0 text-gray-900 focus:ring-2 focus:ring-transparent block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 rounded-r-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-transparent focus:outline-none ${
                  errors.email ? 'border-red-500' : ''
                }`}
                placeholder="muhammadayaz@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <FaLock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </span>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
                className={`bg-gray-50 border border-l-0 text-gray-900 focus:ring-2 focus:ring-transparent block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 rounded-r-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-transparent focus:outline-none ${
                  errors.password ? 'border-red-500' : ''
                }`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Role Selection */}
          {/* Role Selection */}
  <div className="mb-6">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Select Role
    </label>
    <RadioGroup 
      onValueChange={(value) => {
        // Manually set the value in react-hook-form's state
        setValue('role', value);
      }}
      defaultValue={watch('role') || 'admin1'} // Use watched value or default
      className="flex gap-5 mt-2"
    >
      <div className="flex items-center space-x-2 cursor-pointer">
        <RadioGroupItem 
          value="admin1" 
          id="admin1"
          className='cursor-pointer' 
        />
        <Label htmlFor="admin1" className='cursor-pointer'>Admin1</Label>
      </div>
      <div className="flex items-center space-x-2 cursor-pointer">
        <RadioGroupItem 
          value="admin2" 
          id="admin2"
          className='cursor-pointer' 
        />
        <Label htmlFor="admin2" className='cursor-pointer'>Admin2</Label>
      </div>
    </RadioGroup>
    {/* Hidden input for react-hook-form */}
    <input
      type="hidden"
      {...register('role', { required: 'Role is required' })}
    />
    {errors.role && (
      <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
    )}
  </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 ${
                isLoading ? "bg-blue-400" : "bg-blue-600"
              } text-white rounded-lg transition-all duration-300 ${
                !isLoading && "hover:bg-blue-500 hover:shadow-md"
              } active:scale-[0.98] flex items-center justify-center gap-2 group`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <span>CREATE ADMIN</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  export default CreateAdmin;