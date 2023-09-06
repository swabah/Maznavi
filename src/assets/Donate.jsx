import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useToast } from '@chakra-ui/react'
import Qrcode from '../assets/Images/Qr-code.jpeg'
import QrcodeSvg from '../assets/Images/qr-code.svg'


export default function Donate({isOpen,onClose}) {
  const toast = useToast()
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
         <Modal isOpen={isOpen} size={'4xl'} onClose={onClose}>
          <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
          <ModalContent>
            <ModalCloseButton my={2} />
            <ModalBody py={5}>
            <div className=" relative flex flex-col items-center text-center justify-center gap-10 lg:gap-16 w-full h-full p-10 lg:p-16 ">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">Donate.</h2>
              <div className='w-full md:w-8/12 flex flex-col gap-5'>
                <div className='w-full h-full p-5 bg-black rounded-md '>
                <img className='w-full h-full' src={Qrcode} alt="" />
                </div>
                <div onClick={copyDonateNUmberUrl} className='flex items-center justify-center gap-3 lg:gap-5 cursor-pointer w-auto text-base active:bg-gray-50 md:text-lg lg:text-xl font-thin ring-black ring-1 rounded-3xl py-2 px-4'>
                  <img className='w-5 h-5 md:w-8 md:h-8' src={QrcodeSvg} alt="" />
                  <h2 >+91 73560 39673</h2>
                </div>
              </div>
              
            </div>
            </ModalBody>
          </ModalContent>
        </Modal>
        </>
    )
}