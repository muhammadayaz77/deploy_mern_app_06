import React from 'react'


// React Icons imports
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdContactEmergency } from "react-icons/md";
import { MdHome } from "react-icons/md";




function ProfileForm() {
  return (
    <div className='mx-6 overflow-hidden'>
      <div className='border-b-2 border-gray-200 relative'>
        <h3 className='text-sm primary-text mt-10 pb-2 px-5 inline-block relative'>
          ABOUT
          {/* Underline that sits on the border */}
          <span className='absolute -bottom-[2px] left-0 right-0 h-[2px] bg-black'></span>
        </h3> 
      </div>
      <div className='grid grid-cols-12 py-10 gap-10 lg:gap-0'>
        <div className='lg:col-span-6 col-span-12 w-full  overflow-hidden'>
          <h3 className='primary-text font-medium text-lg'>Contact Information</h3>
            {/* For Input Fields */}
            {/* Single Data */}
            <div className='flex mx-3 mt-5'>
              <span><MdEmail className='h-7 w-7 mt-2 primary-text' /></span>
              <div className='border-b-2 w-full pb-2 mx-4'>
                <h4 className='text-[14px] font-medium text-primary'>ayaz@gmail.com</h4>
                <p className='text-[12px] text-gray-500 pt-2'>Email</p>
              </div>
            </div>
            {/* Single Data */}
            <div className='flex mx-3 mt-3'>
              <span><FaPhoneAlt className='h-6 w-6 mt-2 primary-text' /></span>
              <div className='border-b-2 w-full pb-2 mx-4'>
                <h4 className='text-[14px] font-medium text-primary'>+92 38385353</h4>
                <p className='text-[12px] text-gray-500 pt-2'>Phone</p>
              </div>
            </div>
            {/* Single Data */}
            <div className='flex mx-3 mt-3'>
              <span><MdContactEmergency className='h-6 w-6 mt-2 primary-text' /></span>
              <div className='border-b-2 w-full pb-2 mx-4'>
                <h4 className='text-[14px] font-medium text-primary'>+92 38353838</h4>
                <p className='text-[12px] text-gray-500 pt-2'>Emergency Contact</p>
              </div>
            </div>
            {/* Single Data */}
            <div className='flex mx-3 mt-3'>
              <span><MdHome className='h-6 w-6 mt-2 primary-text' /></span>
              <div className='border-b-2 w-full pb-2 mx-4'>
                <h4 className='text-[14px] font-medium text-primary'>ayaz@gmail.com</h4>
                <p className='text-[12px] text-gray-500 pt-2'>Present Address</p>
              </div>
            </div>
            {/* Single Data */}
            <div className='flex mx-3 mt-3'>
              <span className='h-6 w-6 mt-2'></span>
              <div className='border-b-2 w-full pb-2 mx-4'>
                <h4 className='text-[14px] font-medium text-primary'>Dalazak Road</h4>
                <p className='text-[12px] text-gray-500 pt-2'>Permanent Address</p>
              </div>
            </div>
            {/* Single Data */}
            <div className='flex mx-3 mt-3'>
              <span className='h-6 w-6 mt-2'></span>
              <div className='border-b-2 w-full pb-2 mx-4'>
                <h4 className='text-[14px] font-medium text-primary'>Official Signature</h4>
                <p className='text-[12px] text-gray-500 pt-2'>Signature</p>
              </div>
            </div>
        </div>
        <div className='lg:col-span-6 col-span-12'>
        <h3 className='primary-text font-medium text-lg'>Vaccine Certification Information</h3>
        <div className='border-b-2 pb-4 mt-5'>
          <p className='text-black font-medium text-[14px]'>Are you COVID-19 vaccinated?</p>
          <p className='text-gray-900 text-sm'>No</p>
        </div>
        <span className='text-red-500 text-[13px]'>Upload COVID-19 Certificate</span>
        <div className='mt-10'>
          <h3 className='text-[15px] primary-text font-medium'>Get Vaccination Certificate (NADRA)</h3>
          <div className='text-[13px] text-gray-600 mt-2'>
          <p>Note: Points for successfull uploading of vaccination certificate.</p>
          <p>1) Bio data information must be completed.</p>
          <p>2) Certificate size must be less than 600 KB.</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm