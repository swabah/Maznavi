import React from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { useWhatsNew } from '../../hooks/posts'
import formatTime from '../../assets/formatTime'
import { Divider } from '@chakra-ui/react'

function WhatsNew() {
    const { whatsNew, iswhatsNewLoading } = useWhatsNew()
    return (
        <>
            <Navbar />
            <div className='min-h-screen w-full gap-16 flex flex-col items-center justify-start p-7 text-[#3f2d23] lg:px-10 py-16 lg:py-20 xl:px-32'>
                <h2 className='text-3xl lg:text-5xl font-medium capitalize'>📢 What's New</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-full'>
                    {iswhatsNewLoading ?
                        <div className="w-full h-[60vh] rounded-3xl animate-pulse bg-gray-100"></div>
                        :
                        whatsNew.map((what) => (
                            <div className='cursor-pointer md:p-5 lg:p-10 md:rounded-md md:border md:border:gray-100 md:shadow-xl flex flex-col justify-start md:justify-between  w-full h-auto'>
                                <div className='flex md:gap-5 flex-col w-full'>
                                    <h2 className='text-2xl lg:text-4xl font-medium hover:underline'>{what.Heading}</h2>
                                    <p className='text-sm lg:text-lg '>{what.Content}</p>
                                </div>
                                <div className='lg:text-xl w-full mt-5 lg:mt-16'>
                                    <p className='text-blue-700'>{what.account}</p>
                                    <p className='text-sm lg:text-lg '>{formatTime(what.created)}</p>
                                </div>
                                <Divider my={5} className='flex md:hidden' />
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default WhatsNew
