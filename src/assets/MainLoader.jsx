import React from 'react'
import Logo from '../assets/Images/Logo_third.png'
import loading from '../assets/Images/loading.gif'

function MainLoader() {
    return(
        <div className='w-full flex flex-col items-center justify-center bg-[#3f2d2319] h-screen relative'>
            <img className='h-24 lg:h-32 xl:h-44' src={Logo} alt="" />
            <img className='h-5 lg:h-7 xl:h-10 ' src={loading} alt="" />
        </div>
    )
}

export default MainLoader