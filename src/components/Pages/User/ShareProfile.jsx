import { Box, Divider, useToast } from '@chakra-ui/react';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import MazButton from '../../../assets/MazButton';
import { AiFillCopy, AiOutlineShareAlt } from 'react-icons/ai';

function ShareProfile({user}) {
  const toast = useToast()

  const fullPath = useLocation();

  const copyPoemUrl = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "URL Copied",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 2000,
      });
    });
  };

  const sharePoemUrl = () => {
    navigator.share({
      url: fullPath.pathname,
    });
  };

  return (
    <div className="flex flex-col items-center text-center justify-center gap-10  w-full h-full p-5 py-10">
       <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">Share |   {user.username}</h2>
       <Divider  />
        <Box borderRadius="lg" overflow="hidden">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            <div className="flex items-start gap-4 rounded-xl  ">
              <MazButton Link={sharePoemUrl} Icon={<AiOutlineShareAlt className="text-3xl md:text-4xl font-thin   text-[#3f2d23] " />} />
              <MazButton Link={copyPoemUrl} Icon={<AiFillCopy className="text-3xl md:text-4xl font-thin   text-[#3f2d23] " />} />
            </div>
          </Link>
        </Box>
     </div>
  )
}

export default ShareProfile