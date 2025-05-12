import React from 'react'
import SubNavDashboard from '../../../components/dashboard/SubNavDashboard'
import ProfileInfo from '../../../components/dashboard/ProfileInfo'
import ProfileNotification from '../../../components/dashboard/ProfileNotification'

function Profile() {
  return (
    <div>
      <SubNavDashboard />
      <div className='grid grid-cols-12 p-5 gap-10'>
          <div className='col-span-8'>
          <ProfileInfo />
          </div>
          <div className='col-span-4'>
            <ProfileNotification />
          </div>

      </div>
    </div>
  )
}

export default Profile