import React from 'react'
import PersonalInformation from '@/components/dashboard/Profile/PersonalInformation';
import Email from '@/components/dashboard/Profile/Email';
import ProfilePhoto from '@/components/dashboard/Profile/ProfilePhoto';
const page = () => {
  
  return (
    <div className=' flex flex-col gap-4 p-5 w-full h-full  bg-white'>
           <PersonalInformation  />
           <Email/>
           <ProfilePhoto/>
    </div>
  )
}

export default page;