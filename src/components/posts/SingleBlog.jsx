import React, { useState } from "react";
import {PiArrowLineUpRightThin } from "react-icons/pi";
import PostsDemo from "../Demo/PostsDemo";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
import { FiXOctagon } from "react-icons/fi";


export const SingleBlog = ({Blog,Loading,key}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    // State to track the selected blog image
    const [selectedBlogImage, setSelectedBlogImage] = useState(null);

    // Function to open the modal with the selected blog image
    const openModalWithImage = (blogImage) => {
      setSelectedBlogImage(blogImage);
      onOpen();
    };

  return (
    <>
    {Loading ? (
      <PostsDemo h="h-96" count={20} />
    ) : (
    <div key={key} className="relative w-full h-full">
       <img src={Blog.BlogImgUrl} alt="" className="object-cover w-full transition-all duration-300 rounded-xl h-full hover:shadow-xl shadow-md" />
       <div onClick={() => openModalWithImage(Blog.BlogImgUrl)} className='absolute inset-0 w-full h-full bg-[#0000003b] rounded-xl flex items-center opacity-0 hover:opacity-100 transition-all justify-center text-white text-5xl'><PiArrowLineUpRightThin/></div>
    </div>
    )}
     <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='whiteAlpha.600' backdropFilter='blur(60px) hue-rotate(90deg)' />
        <ModalContent>
        <ModalCloseButton>
            <FiXOctagon className='absolute z-20 text-[#3f2d23] -top-10 md:top-0 md:-right-12 text-2xl' onClick={onClose} />
        </ModalCloseButton>
        {
            selectedBlogImage && (
            <img src={selectedBlogImage} alt="" className="object-cover w-full h-full rounded-md" />
            )
        }
        </ModalContent>
    </Modal>
    </>
  );
};

