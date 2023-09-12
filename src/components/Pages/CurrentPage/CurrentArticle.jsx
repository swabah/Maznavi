import React, {useEffect, useState} from "react";
import {
  Divider,
  useToast,
} from "@chakra-ui/react";
import {motion} from "framer-motion";
import { Link, useLocation, useParams} from "react-router-dom";
import {db} from "../../../lib/firebase";
import {doc, onSnapshot} from "firebase/firestore";
import {AiFillCopy,  AiOutlineRead,  AiOutlineShareAlt} from "react-icons/ai";
import Navbar from "../../layout/Navbar";
import MazButton from "../../../assets/MazButton";
import {FaFacebook, FaInstagram } from "react-icons/fa";
import parseEmphasis from "../../../assets/parseEmphasis";
import Footer from "../../layout/Footer";
import PostsDemo from "../../Demo/PostsDemo";
import { useArticles } from "../../../hooks/posts";
import { CgPentagonBottomLeft } from "react-icons/cg";
import { ReadingTime } from "../../../assets/ReadingTime";
import { PiWhatsappLogoLight } from "react-icons/pi";
import formatTime from "../../../assets/formatTime";

export default function CurrentArticle() {
  const {ArticleId} = useParams();
  const { Articles } = useArticles();
  const [CurrentArticle, setCurrentArticle] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    onSnapshot(doc(db, "Articles", ArticleId), snapshot => {
      setLoading(false)
      setCurrentArticle({...snapshot.data(), id: snapshot.id});
    });
  }, [ArticleId]);


  const toast = useToast();

  console.log(CurrentArticle);

  const content = parseEmphasis(CurrentArticle.content)
  const fullPath = useLocation();

  const copyArticleUrl =()=>{
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

    const ShareArticleUrl =()=>{
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
      <motion.div className='w-full min-h-screen' layout>
      {Loading ? (
         <PostsDemo h="h-full" count={1} />
        ) : (
          <div className="w-full h-full p-7  text-[#3f2d23] lg:px-10 py-16 lg:py-20 xl:px-32">
          {/* <Box mb={4}>
              <Breadcrumbs one={'Articles'} oneTo={'/Articles'} currentPage={CurrentArticle.title} />
          </Box> */}
          <div className="flex flex-col w-full h-full gap-5 lg:flex-row lg:gap-5 xl:gap-10">
            <div className='h-full w-full lg:w-[70%]'>
                <div className="flex flex-col items-start w-full h-auto gap-3 rounded-xl">
                      <Link to={`/Articles/${CurrentArticle?.topic}`} onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} key={CurrentArticle?.id}>
                      <h2 className="font-medium uppercase md:text-lg ">{CurrentArticle.topic}</h2>
                      </Link>
                    <h2 className="mt-1 text-3xl font-medium md:text-4xl xl:text-5xl">{CurrentArticle.title}</h2>                  
                    <div className='  md:text-lg z-20 w-auto h-auto text-[#000] flex items-center gap-2 py-2 md:py-3'>
                      <AiOutlineRead/>
                      <h2 className='font-sans text-sm font-extralight'>{ReadingTime(CurrentArticle?.content)} Minutes</h2>
                    </div>
                    <div className='flex items-center justify-between w-full pt-7'>
                      <div className='md:w-1/2 flex items-center gap-1.5 md:gap-5' textDecoration="none" _hover={{ textDecoration: "none" }}>
                        <div className='w-8 h-8 bg-black md:w-12 rounded-3xl md:h-12'></div>
                        <Link className=" flex flex-col  text-[#3f2d23] ">
                          <a className="text-sm truncate md:text-lg" href={CurrentArticle.writer?.writer_link}>{CurrentArticle.writer?.writer_name}</a>
                          <p className="text-xs md:text-sm text-[#3f2d23] ">{formatTime(CurrentArticle?.created)}</p>
                        </Link>
                      </div>
                      <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                      <div className="md:w-1/2 flex items-start text-[#3f2d23] gap-4 rounded-xl ">
                        <MazButton Link={ShareArticleUrl} Icon={<AiOutlineShareAlt className="text-xl md:text-2xl font-thin  text-[#3f2d23]"/>}/>
                        <MazButton Link={copyArticleUrl} Icon={<AiFillCopy className="text-xl md:text-2xl font-thin  text-[#3f2d23] "/>}/>
                      </div>
                      </Link>
                    </div>
                    <Divider mt="5" />
                  </div>
                  {/* <div className="w-full h-[50vh] relative md:h-[60vh] lg:h-[70vh] rounded-lg overflow-hidden mt-10 lg:mt-14 xl:mt-16" >
                    <img
                      src={CurrentArticle?.imageUrl}
                      alt='Article image'
                      className='object-cover w-full h-full transition-all duration-500 rounded-lg cursor-move hover:scale-105'
                    />
                      {CurrentArticle.writer?.writer_name && 
                    <div className='absolute top-0 p-1.5 md:p-2.5 z-10 right-0 rounded-2xl flex items-center transition-all justify-center text-5xl'>
                        <div className='flex items-center bg-[#C0C0C0] backdrop-blur-sm bg-opacity-60 text-[10px] md:text-xs p-1 px-1.5 rounded-lg gap-1'>
                          <CgPentagonBottomLeft className='text-base'/>
                          <a className='truncate opacity-90' href={CurrentArticle.writer?.writer_link}>{CurrentArticle.writer?.writer_name}</a>
                        </div>
                    </div>
                      }
                     {CurrentArticle.socialLinks?.instagram || CurrentArticle.socialLinks?.facebook ?
                    <div className='absolute top-0 p-1.5 md:p-2.5 z-10 left-0 rounded-2xl flex items-center transition-all justify-center text-5xl'>
                        <div className='flex items-center bg-[#C0C0C0] backdrop-blur-sm bg-opacity-60 text-sm md:text-base p-0.5 md:p-1 px-1.5 rounded-lg gap-1'>
                        <p className="text-[10px] md:text-xs">Open</p>
                        <a href={CurrentArticle.socialLinks?.instagram}><FaInstagram/></a>
                        {CurrentArticle.socialLinks?.facebook && <a href={CurrentArticle.socialLinks?.facebook}><FaFacebook/></a> }
                        </div>
                    </div>
                    :''
                      }
                    </div>*/}
                <h2 className="w-full pt-10 whitespace-pre-line align-middle text-lg tracking-wide hyphens-auto text-center md:text-start">
                  {content?.map((line,index)=>(
                    <p key={index}>{line}</p>
                  ))}
                </h2>
            </div>
            <div className='h-full w-full lg:w-[30%] flex flex-col gap-y-3 pt-5 lg:pt-0 lg:gap-y-5'>
                <div className="bg-[#3f2d2311] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
                  <div className="w-full text-start md:text-left">
                    <h2 className="w-full text-2xl font-semibold text-center">Popular on Articles</h2>
                    <hr className="w-full my-4 border-gray-200" />
                    <div className="space-y-4">
                      {Articles?.slice(0, 5).map((Article) => (
                        <Link to={`/Articles/id/${Article?.id}`} onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} key={Article?.id}>
                          <div className="p-2 rounded-md hover:underline active:shadow-sm">
                            <h3 className="font-medium text-md">{Article.title}</h3>
                            <h4 className="text-sm text-gray-600 uppercase">{Article.topic}</h4>
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
                    <h2 className="w-full text-2xl font-semibold text-center">Never miss an Update !</h2>
                    <p className="w-full text-base text-center ">Sign up for free and be the first to <br /> get notified about updates.</p>
                    <input 
                      value={email}
                      required
                      pattern="[^@]*@[^@]*[.com]"
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-full rounded-3xl w-full bg-[#3f2d2319] mt-6 p-2.5 px-6 placeholder:text-black" type="email" name="Email" placeholder="Enter Your Email" id="Email" />
                      <button type="submit" className=' border-[#3f2d2319] bg-[#3f2d230c] active:bg-[#3f2d2319] border-2 font-medium rounded-3xl text-lg py-1 w-full mt-3 items-center justify-center flex h-auto'>
                        {subscribed ? <p className="py-1 text-base">Thanks For Your Subscription !</p> :<h2>Submit</h2> }
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
