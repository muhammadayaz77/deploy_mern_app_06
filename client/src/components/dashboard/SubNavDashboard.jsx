import React from 'react'
import { MdHome } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { useLocation } from 'react-router-dom';

function SubNavDashboard() {
  const location = useLocation(); // Get the current location object
  const currentPath = location.pathname; // Extract the current path
  console.log(currentPath)
  
  return (
    <div className='flex items-center bg-white border-b-4 py-2 pl-3 gap-2 shadow-md'>
      <span><MdHome className='primary-text h-5 w-5' /></span>
      <span><IoIosArrowForward className='primary-text h-5 w-5' /></span>
      {
        currentPath === '/student/profile' ? 
        <span className='primary-text'>Profile</span>
        : currentPath === '/student/credentials/change' ? 
        <span className='primary-text'>Change Password</span>
        : ''
      }
    </div>
  )
}

export default SubNavDashboard