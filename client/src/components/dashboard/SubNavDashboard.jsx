import React from 'react'
import { MdHome } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

function SubNavDashboard() {
  return (
    <div className='flex items-center bg-white border-b-4 py-2 pl-3 gap-2 shadow-md'>
      <span><MdHome className='primary-text h-5 w-5' /></span>
      <span><IoIosArrowForward className='primary-text h-5 w-5' /></span>
      <span className='primary-text'>Profile</span>
    </div>
  )
}

export default SubNavDashboard