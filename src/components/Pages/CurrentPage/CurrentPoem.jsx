import React, { useEffect, useState } from "react";
import { Link as routerLink, useLocation, useParams } from "react-router-dom";
import { db } from "../../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AiFillCopy, AiOutlineShareAlt } from "react-icons/ai";
import Navbar from "../../layout/Navbar";
import MazButton from "../../../assets/MazButton";
import Footer from "../../layout/Footer";
import { Box, Divider, Link, useToast } from "@chakra-ui/react";
import { usePoems } from "../../../hooks/posts";
import Breadcrumbs from "../../../assets/Breadcrumbs";
import { FaQuoteLeft } from "react-icons/fa";
import parseEmphasis from "../../../assets/parseEmphasis";
import PostsDemo from "../../Demo/PostsDemo";
import {motion} from "framer-motion";
import { PiWhatsappLogoLight } from "react-icons/pi";

export default function CurrentPoem() {
  const { PoemId } = useParams();
  const [currentPoem, setCurrentPoem] = useState({});
  const { Poems, isPoemLoading } = usePoems();

  const toast = useToast()

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "Poems", PoemId), (snapshot) => {
      setCurrentPoem({ ...snapshot.data(), id: snapshot.id });
    });

    return () => unsubscribe();
  }, [PoemId]);

    const content = parseEmphasis(currentPoem.poemDesc)

    const fullPath = useLocation();

    const copyPoemUrl =()=>{
      navigator.clipboard.writeText(window.location.href).then(()=>{
        toast({
          title: "URL Copied",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 2000,
        });
      })
    }
  
      const SharePoemUrl =()=>{
      navigator.share({
          url: fullPath.pathname,
      })
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycby5saW9JJ2p8uJ5mcGWhyubFMEPwmhWikMf7jaIa836nVt7YKhmjpHgosbh08-1dtN5/exec';
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(scriptURL, {
          method: 'POST',
          body: new URLSearchParams({ Email: email }), // Send the email in the request body
        });

        if (response.ok) {
          setSubscribed(true);
          // setSubscribed(false);
        } else {
          console.error('Error sending email');
        }
      } catch (error) {
        console.error('Error sending email', error);
      }
    };

  return (
    <>
      <Navbar />
      <motion.div className='min-h-screen w-full' layout>
      {isPoemLoading ? (
         <PostsDemo h="h-full" count={1} />
        ) : (
        <div className="w-full h-full p-7  text-[#3f2d23] lg:px-10 py-16 lg:py-20 xl:px-32">
          <Box mb={4}>
            <Breadcrumbs one={'Poems'} oneTo={'/Poems'} currentPage={currentPoem.author} />
          </Box>
          <div className="w-full h-full flex flex-col lg:flex-row gap-5 md:gap-3 lg:gap-5 xl:gap-10">
          <div className="h-full w-full lg:w-[70%]">
              <div className="bg-[#3f2d2311] h-auto w-full gap-y-3 rounded-xl p-5 md:p-8 flex flex-col items-start">
                <div className="rounded-full p-4 text-xl font-bold text-[#3f2d23] bg-white">
                <FaQuoteLeft/>
                </div>
                <h2 className="text-4xl font-medium pt-3">{currentPoem.poemTitle}</h2>
                <Link as={routerLink} to={`/${currentPoem?.author}`} onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} key={currentPoem?.id}>
                  <p className="cursor-pointer text-[#120f08] text-base">{currentPoem.author}</p>
                </Link>
                <Divider mt="5" />
                <Box borderRadius="lg" overflow="hidden">
                  <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <div className="flex items-start gap-4 rounded-xl  ">
                    <MazButton Link={SharePoemUrl} Icon={<AiOutlineShareAlt className="text-xl md:text-2xl font-thin  text-[#3f2d23] "/>}/>
                    <MazButton Link={copyPoemUrl} Icon={<AiFillCopy className="text-xl md:text-2xl font-thin  text-[#3f2d23] "/>}/>
                  </div>
                  </Link>
                </Box>
              </div>
              <h2 className="text-lg whitespace-pre-line tracking-wide align-middle pt-10 w-full hyphens-auto text-start">
                {content}
              </h2>
          </div>
          <div className="h-full w-full lg:w-[30%] flex flex-col gap-y-3 pt-5 lg:pt-0 lg:gap-y-5">
       <div className="bg-[#3f2d2311] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="text-start md:text-left w-full">
              <h2 className="text-2xl font-semibold w-full text-center">Popular on Poems</h2>
              <hr className="border-gray-200 w-full my-4" />
              <div className="space-y-4">
                {Poems.slice(0, 5).map((Poem) => (
                  <Link as={routerLink} to={`/Poems/id/${Poem?.id}`} onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} key={Poem?.id}>
                    <div className="p-2 rounded-md active:shadow-sm">
                      <h3 className="text-md font-medium mb-1">{Poem.poemTitle}</h3>
                      <h4 className="text-sm text-gray-600">{Poem.author}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <a href='https://wa.me/+918714398351' className='w-full h-full bg-[#3f2d2311] gap-5 p-6 md:px-10 lg:px-16 flex items-center md:col-span-2 rounded-xl'>
              <PiWhatsappLogoLight className='text-3xl md:text-5xl lg:text-6xl'/>
              <div className='flex flex-col items-start'>
                  <p className='text-sm md:text-lg font-thin'>Join Our</p>
                  <h2 className='text-xl md:text-2xl lg:text-4xl'>WhatsApp Group</h2>
                  <p className='text-sm md:text-lg font-thin'>To get instant updates.</p>
              </div>
          </a>
            <form onSubmit={handleSubmit}  className='bg-[#3f2d2311] h-auto w-full gap-y-1.5  rounded-xl p-6 flex flex-col items-center'>
                <h2 className="text-2xl font-semibold w-full text-center">Never miss an Update !</h2>
                <p className="text-base w-full text-center ">Sign up for free and be the first to <br /> get notified about updates.</p>
                <input 
                  value={email}
                  required
                  pattern="[^@]*@[^@]*[.com]"
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-full rounded-3xl w-full bg-[#3f2d2319] mt-6 p-2.5 px-6 placeholder:text-black" type="email" name="Email" placeholder="Enter Your Email" id="Email" />
                  <button type="submit" className=' border-[#3f2d2319] bg-[#3f2d230c] active:bg-[#3f2d2319] border-2 font-medium rounded-3xl text-lg py-1 w-full mt-3 items-center justify-center flex h-auto'>
                    {subscribed ? <p className="text-base py-1">Thanks For Your Subscription !</p> :<h2>Submit</h2> }
                  </button>
            </form>
          </div>
          </div>
        </div>
        )}
      </motion.div>
      <Footer/>
    </>
  );
}


