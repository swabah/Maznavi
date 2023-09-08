import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useToast } from '@chakra-ui/react'
import Qrcode from '../assets/Images/Qr-code.jpeg'
import QrcodeSvg from '../assets/Images/Icons/qr-code.svg'
import { useState } from 'react'


export default function Donate({isOpen,onClose}) {
  const toast = useToast()
const [Hide,setHide] = useState(false)

const HideLoading =()=>{
  setTimeout(() => {
    setHide(true)
  }, 500);
}
  const copyDonateNUmberUrl =()=>{
    navigator.clipboard.writeText('+91 73560 39673').then(()=>{
      toast({
        title: "Pay Number Copied",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 1000,
      });
    })
  }
    return(
        <>
         <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
          <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
          <ModalContent>
            <ModalCloseButton my={2} />
            <ModalBody py={5}>
            <div className=" relative flex flex-col items-center text-center justify-center gap-10 lg:gap-16 w-full h-full p-5 lg:p-10 ">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">Donate.</h2>
              <div className='w-full md:w-10/12 flex flex-col gap-5'>
                <div className='w-full relative overflow-hidden h-full p-5 bg-black rounded-md '>
                  <img className='w-full h-full' src={Qrcode} alt="" />
                  <div onClick={()=>HideLoading()} className={`${Hide && 'hidden'} inset-0 cursor-pointer hover:scale-105 duration-500 transition-all w-full gap-3 h-full bg-white flex flex-col items-center justify-center opacity-90 absolute`}>
                    <img   className='w-10 h-10 md:w-16 md:h-16' src={QrcodeSvg} alt="" />
                    <h2 className='text-green-600 font-medium md:text-lg'>Open QR Code</h2>
                  </div>
                </div>
                <div onClick={copyDonateNUmberUrl} className='flex flex-col md:flex-row items-center justify-center gap-0.5 lg:gap-3 cursor-pointer w-auto text-sm hover:bg-gray-50 active:bg-gray-50 md:text-base lg:text-lg font-thin ring-black ring-1 rounded-3xl py-3 md:py-2 px-4'>
                  <p >Copy Google Pay</p>
                  <h2 >" +91 73560 39673 "</h2>
                </div>
              </div>
              
            </div>
            </ModalBody>
          </ModalContent>
        </Modal>
        </>
    )
}