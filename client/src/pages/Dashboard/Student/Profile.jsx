import React, { useState } from 'react'
import SubNavDashboard from '../../../components/dashboard/SubNavDashboard'
import ProfileInfo from '../../../components/dashboard/ProfileInfo'
import ProfileNotification from '../../../components/dashboard/ProfileNotification'

function Profile() {
  const [covidFile, setCovidFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <SubNavDashboard />
      <div className='grid grid-cols-12 p-4 md:p-5 lg:gap-5'>
          <div className='lg:col-span-9 col-span-12'>
          <ProfileInfo />
          </div>
          <div className='lg:col-span-3 col-span-12'>
            <ProfileNotification />
          </div>

      </div>
    </div>
  )
}

export default Profile