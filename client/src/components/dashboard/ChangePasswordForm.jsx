import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { CHANGE_PASSWORD_API_ENDPOINT } from "../../utils/constants";
import { useNavigate } from "react-router-dom";


function ChangePasswordForm() {
  const navigate = useNavigate(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        CHANGE_PASSWORD_API_ENDPOINT,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,  // Correct property name for sending cookies
        }
      );
      navigate('/student/profile')
      window.toastify(response.message || "Password changed successfully",'success')
      console.log("Password change successful!", response.data);
      reset();
      
    } catch (err) {
      console.error("Error changing password:", err);
      window.toastify(err?.response?.data.message || 'Password Change failed!','error')

      
      // Handle different error scenarios
      if (err.response) {
        // The request was made and the server responded with a status code
        window.toastify(err?.response?.data || 'Password Change failed!','error')
        console.error("Server responded with:", err.response.status);
        console.error("Error details:", err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received:", err.request);
        window.toastify(err?.request || 'Log in failed!','error')
      } else {
        // Something happened in setting up the request
        console.error("Request error:", err.message);
        window.toastify(err?.message || 'Password  failed!','error')
      }
      
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-6">
        {/* Old Password Field */}
        <div className="relative">
          <input
            type="password"
            id="oldPassword"
            className={`w-full bg-transparent border-b-2 ${
              errors.oldPassword ? "border-red-500" : "border-gray-300"
            } text-black pt-5 pb-1 px-0 outline-none peer transition-all duration-300`}
            placeholder=" "
            {...register("oldPassword", {
              required: "Old password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <label
            htmlFor="oldPassword"
            className="absolute left-0 top-4 text-gray-500 transition-all duration-300 transform -translate-y-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-sm pointer-events-none"
          >
            Old Password
          </label>
          <div className="relative overflow-hidden h-0.5">
            <span
              className={`absolute bottom-0 left-1/2 w-0 h-full ${
                errors.oldPassword ? "bg-red-500" : "bg-blue-500"
              } transition-all duration-500 transform -translate-x-1/2 peer-focus:w-full`}
            ></span>
          </div>
          {errors.oldPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        {/* New Password Field */}
        <div className="relative">
          <input
            type="password"
            id="newPassword"
            className={`w-full bg-transparent border-b-2 ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            } text-black pt-5 pb-1 px-0 outline-none peer transition-all duration-300`}
            placeholder=" "
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: (value) =>
                value !== "password" || "Don't use common passwords",
            })}
          />
          <label
            htmlFor="newPassword"
            className="absolute left-0 top-4 text-gray-500 transition-all duration-300 transform -translate-y-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-sm pointer-events-none"
          >
            New Password
          </label>
          <div className="relative overflow-hidden h-0.5">
            <span
              className={`absolute bottom-0 left-1/2 w-0 h-full ${
                errors.newPassword ? "bg-red-500" : "bg-blue-500"
              } transition-all duration-500 transform -translate-x-1/2 peer-focus:w-full`}
            ></span>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>
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
              <span>UPDATE PASSWORD</span>
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
  );
}

export default ChangePasswordForm;