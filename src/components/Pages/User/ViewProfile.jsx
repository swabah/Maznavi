import React from 'react'
import { FaInstagram } from 'react-icons/fa'

function ViewProfile({user}) {
  return (
    <div className="flex flex-col items-center text-center justify-center gap-7 lg:gap-10 w-full h-full p-5 py-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">@ {user.username}</h2>
        <div className='w-full flex items-center gap-2 justify-start flex-col '>
            <div className='w-20  h-20 lg:w24 lg:h-24 xl:w-28 xl:h-28 rounded-full p-1 bg-gray-100'>
             <img className='w-full h-full object-cover rounded-full' src={user.userPhoto} />
            </div>
            <div className='flex gap-2 items-center  py-5 '>
              {user?.InstagramLink && (<a className='text-2xl lg:text-3xl' href={user?.InstagramLink}>  <FaInstagram  /></a>)}
            </div>
            <p className='text-sm md:text-base capitalize font-semibold'>{user?.fullName}</p>
            {user?.DOB && (
              <p className='text-sm md:text-base capitalize font-medium'>DOB : {user?.DOB}</p>
            )}
            <p className='w-full text-sm md:text-base  whitespace-pre-line '>{user?.bio}</p>
        </div>
    </div>
  )
}

export default ViewProfile