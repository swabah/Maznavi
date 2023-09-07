import React from 'react'
import Navbar from '../../layout/Navbar'
import Footer from '../../layout/Footer'

function MyAccound() {

  return (
    <>
    <Navbar/>
    {/* <div className='w-full text-[#120f08] bg-[#fff]  min-h-full p-7 lg:px-10 py-8 md:py-16  xl:px-32'>
        My Accound <br />
        {user?.username} <br />
        {user?.email} <br />
        {user?.fullName} <br />
        {user?.bio} <br />
        {user?.mobNumber} <br />
        <img className='w-10 h-10' src={user?.userPhoto} alt="" />
        
        <Box
            borderWidth='1px'
            borderRadius='lg'
            className='hover:shadow-sm p-5 w-full h-full md:p-10 flex flex-col items-center justify-between backdrop-blur-xl bg-white active:bg-gray-50 cursor-pointer'
            onClick={() => onOpen()}
            >
            <FiPlus className='text-3xl' />
            <h2 className='md:text-lg lg:text-2xl font-normal tracking-wide'>
                New Poem
            </h2>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
          <ModalContent>
            <ModalCloseButton my={2} />
            <ModalBody py={5}>
              <NewPoemDemo/>
            </ModalBody>
          </ModalContent>
        </Modal>
        <div>
           <ListPoemsDemo/>
        </div>
    </div> */}
    <Footer/>
    </>
  )
}

export default MyAccound