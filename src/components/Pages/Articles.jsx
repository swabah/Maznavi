import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import {
    Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SingleArticle } from "../posts/SingleArticle";
import PostsDemo from "../Demo/PostsDemo";
import { useArticles } from "../../hooks/posts";
import {Link} from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";
import formatTime from "../../assets/formatTime";


export default function Articles() {
    const { Articles, isArticleLoading } = useArticles();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredArticles = Articles?.filter((Article) =>
      Article.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>
            <Navbar />
            <div className="w-full h-full min-h-screen py-12 bg-white shadow-sm p-7 lg:px-10 md:py-20 xl:px-32 ">
                <div className='relative flex flex-col items-center justify-center w-full h-auto gap-3 py-5 text-center '>
                    <h2 className='text-3xl font-semibold tracking-wider lg:text-4xl xl:text-5xl'>
                        <span className='text-[#3f2d23]'>Spark Your Creativity</span> <br /> with Our Engaging Articles
                    </h2>
                    <p className='text-base lg:text-lg'> Discover Compelling Narratives, Beautiful Poetry, and Enthralling Articles Tailored for You.</p>
                </div>
                <Divider marginTop='5' />
                <input
                    placeholder="🔍 Explore Articles by Topics"
                    value={searchQuery}
                    className="outline-[#3f2d2328] w-full mb-10  outline-dashed outline-2 p-2 px-5 rounded"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {!searchQuery &&
                    <>
                        <div className='relative  w-full bg-gray-100 h-72 md:h-96 lg:h-[90vh]'>
                            {isArticleLoading ? (
                                <PostsDemo h='h-72 md:h-96 lg:h-[90vh]' count={1} />
                            ) : (
                                Articles?.slice(0,1).map(Article => (
                                    <>
                                    <img src={Article.imageUrl} alt="" className="object-cover w-full h-full" />
                                    <div className="absolute p-4 md:p-5 lg:p-14 w-full gap-1 lg:gap-2 flex flex-col bg-gradient-to-t from-[#3f2d23] bg-opacity-70 text-white to-transparent left-0 bottom-0">
                                        <div className='flex items-center gap-1 text-sm lg:text-base opacity-80'>
                                            <h2>{formatTime(Article?.created)} </h2> 
                                            {Article.socialLinks?.instagram || Article.socialLinks?.facebook ? 
                                            <>
                                                <p className="text-[10px] pl-3">Open</p>
                                                {Article.socialLinks?.instagram && <a href={Article.socialLinks?.instagram}><FaInstagram/></a> } 
                                                {Article.socialLinks?.facebook && <a href={Article.socialLinks?.facebook}><FaFacebook/></a> }
                                            </>
                                            :''}
                                        </div>
                                        <div className='  md:text-lg z-20 w-auto h-auto text-[#fff] flex items-center gap-2 md:py-1'>
                                            <AiOutlineRead/>
                                            <h2 className='font-sans text-sm font-extralight'>3 minutes</h2>
                                        </div>
                                        <Link
                                        to={`/Articles/id/${Article?.id}`}
                                        onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
                                        >
                                            <h2 className="text-xl font-semibold lg:text-3xl hover:underline">{Article.title}</h2>
                                        </Link>
                                        <p className="text-base leading-tight tracking-wider capitalize lg:text-base line-clamp-2">{Article.content}</p>
                                        <div className="flex item-center text-sm lg:text-base mt-2 lg:mt-5 text-[#ffff] gap-3">
                                            <Link onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} to={`/Articles/${Article?.topic}`}>
                                            <div className="rounded-3xl bg-white hover:bg-opacity-10 uppercase font-medium tracking-wider cursor-pointer bg-opacity-0 border-[0.2px] p-0.5 lg:p-1 px-4 lg:px-6">{Article.topic}</div>
                                            </Link>
                                        </div>
                                    </div>
                                    </>
                                ))
                            )}
                        </div>
                        <div className='flex items-center gap-3 p-2 text-base md:text-lg lg:text-xl py-7 md:py-10'>
                            <p className=' bg-[#3f2d23] uppercase -skew-x-12 text-white font-medium  p-1 px-3 tracking-wider '>Related</p>
                            <div className="h-[1px] bg-[#3f2d239e] w-full"></div>
                        </div>
                    </>
                    }
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-y-10 ">
                    {filteredArticles?.map(Article => (
                        <motion.div className="object-cover w-full" layout>
                            <SingleArticle key={Article.id} Loading={isArticleLoading} Article={Article} />
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
