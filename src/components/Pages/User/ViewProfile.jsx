import React from 'react'

function ViewProfile({user}) {
  return (
    <div className="flex flex-col items-center text-center justify-center gap-10 lg:gap-20 w-full h-full p-5 py-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">@ {user.username}</h2>
        <div className='w-full '>
        </div>
    </div>
  )
}

export default ViewProfile