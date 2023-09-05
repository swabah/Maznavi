import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { useArticles, useBlogs, usePoems } from "../../hooks/posts";
import { Link } from "react-router-dom";
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FiXOctagon } from "react-icons/fi";
import HeaderBtn from "../../assets/HeaderBtn";

export default function Explore() {
  const { Articles } = useArticles()
  const { Poems } = usePoems()
  const { Blogs } = useBlogs()

  // Modal disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State to track the selected blog image
  const [selectedBlogImage, setSelectedBlogImage] = useState(null);

  // Create a mapping of unique topics to their associated articles
  const uniqueTopics = [...new Set(Articles?.map((Article) => Article.topic))];

  // Function to open the modal with the selected blog image
  const openModalWithImage = (blogImage) => {
    setSelectedBlogImage(blogImage);
    onOpen();
  };

  return (
    <>
      <Navbar />
      <div className="w-full text-[#3f2d23] min-h-screen bg-[#fff] shadow-sm h-full p-7 lg:px-10 py-16 lg:py-20 xl:px-32 ">
        <div className='grid w-full min-h-[60vh] grid-cols-1 gap-5 md:grid-cols-2'>
          {Blogs?.slice(0, 1).map((blog) => (
            <img
              key={blog.id}
              onClick={() => openModalWithImage(blog.BlogImgUrl)}
              className="cursor-pointer object-cover w-full h-full bg-red-300 border rounded-md shadow-md"
              src={blog?.BlogImgUrl}
              alt="Blog image"
            />
          ))}
          <div className='grid w-full h-full grid-cols-1 gap-5 md:grid-cols-2'>
            {Blogs?.slice(1, 5).map((blog) => (
              <img
                key={blog.id}
                onClick={() => openModalWithImage(blog.BlogImgUrl)}
                className="cursor-pointer object-cover w-full h-full bg-red-300 border rounded-md shadow-md"
                src={blog?.BlogImgUrl}
                alt="Blog image"
              />
            ))}
          </div>
        </div>
          <div className="w-full py-20 ">
            <HeaderBtn Head='Topics' />
            <div className='z-20 flex items-center justify-start w-full h-auto gap-3 overflow-hidden overflow-x-visible md:gap-5'>
              {uniqueTopics.map((topic) => (
                <div key={topic} className='relative overflow-hidden transition-all rounded-lg cursor-pointer h-44'>
                  <Link onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} to={`/Articles/${topic}`}>
                    <img className='object-cover w-full h-full rounded-lg' src={Articles?.find((Article) => Article.topic === topic)?.imageUrl} alt="" />
                    <div className='absolute inset-0 flex items-center justify-center w-full h-full text-lg font-medium tracking-wider text-white uppercase transition-all bg-black rounded-lg hover:scale-105 bg-opacity-40 hover:bg-opacity-50'>{topic}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-full">
            <HeaderBtn Head='Poems' />
            <div className='grid w-full h-full grid-cols-1 gap-5 md:grid-cols-4'>
                {Poems?.slice(0,8).map((Poem)=>(
                  <Link key={Poem.id} to={`/Poems/id/${Poem?.id}`} className='relative border-2 hover:border-0 hover:bg-[#3f2d2311] border-[#3f2d2318] hover:border-[#3f2d2328] rounded-md p-4 md:p-6 hover:shadow-md cursor-pointer transition-all' onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} >
                        <div className="flex justify-start w-full h-full text-center">
                            <div className="text-base tracking-wide whitespace-pre-wrap line-clamp-6">
                              {Poem.desc}
                            </div>
                        </div>
                  </Link>
                ))}
            </div>
          </div>
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
       </div>
    <Footer/>
    </>
  );
}
