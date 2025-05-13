import React from 'react'
import { MdEmail } from "react-icons/md";

function ProfileForm() {
  return (
    <div className='mx-6'>
      <div className='border-b-2 border-gray-200 relative'>
        <h3 className='text-sm primary-text mt-10 pb-2 px-5 inline-block relative'>
          ABOUT
          {/* Underline that sits on the border */}
          <span className='absolute -bottom-[2px] left-0 right-0 h-[2px] bg-black'></span>
        </h3> 
      </div>
      <div className='grid grid-cols-12 my-10'>
        <div className='col-span-6'>
          <h3 className=''>Contact Information</h3>
            {/* For Input Fields */}
            <div className='flex gap-3 mx-3 mt-3'>
              <span><MdEmail className='h-7 w-7' /></span>
              <div>
                <h4 className='text-[15px]'>ayaz@gmail.com</h4>
                <p className='text-[12px]'>Email</p>
              </div>
            </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default ProfileForm