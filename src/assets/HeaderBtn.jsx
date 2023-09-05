import React from 'react'

function HeaderBtn({Head}) {

  return (
    <div className='p-2 text-base md:text-lg lg:text-2xl gap-3 flex items-center pb-7 md:pb-14'>
        <p className=' bg-[#3f2d23] uppercase -skew-x-12 text-white font-medium  p-1 px-3 tracking-wider '>{Head}</p>
        <div className="h-[1px] bg-[#3f2d239e] w-full"></div>
    </div>
  )
}

export default HeaderBtn