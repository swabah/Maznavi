import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import {
    Box,
    Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SingleArticle } from "../posts/SingleArticle";
import PostsDemo from "../Demo/PostsDemo";
import { useArticles } from "../../hooks/posts";
import {Link} from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";


export default function Articles() {
    const { Articles, isArticleLoading } = useArticles();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredArticles = Articles?.filter((Article) =>
      Article.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <div className="w-full h-full min-h-screen bg-white shadow-sm py-12 p-7 lg:px-10 md:py-20 xl:px-32 ">
                <div className='h-auto py-5  relative w-full flex flex-col text-center gap-3 items-center justify-center '>
                    <h2 className='text-3xl lg:text-4xl xl:text-5xl tracking-wider font-semibold'>
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
                                    <img src={Article.imageUrl} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute p-4 md:p-5 lg:p-14 w-full gap-1 lg:gap-2 flex flex-col bg-gradient-to-t from-[#3f2d23] bg-opacity-70 text-white to-transparent left-0 bottom-0">
                                        <div className='text-sm lg:text-base gap-1 opacity-80 flex items-center'>
                                            <h2>{Article.created.date} </h2> 
                                            {Article.socialLinks?.instagram || Article.socialLinks?.facebook && 
                                            <>
                                                <p className="text-[10px] pl-3">Open</p>
                                                {Article.socialLinks?.instagram && <a href={Article.socialLinks?.instagram}><FaInstagram/></a> } 
                                                {Article.socialLinks?.facebook && <a href={Article.socialLinks?.facebook}><FaFacebook/></a> }
                                            </>
                                            }
                                        </div>
                                        <Link
                                        to={`/Articles/id/${Article?.id}`}
                                        onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
                                        >
                                            <h2 className="text-xl lg:text-3xl hover:underline font-semibold">{Article.title}</h2>
                                        </Link>
                                        <p className="text-base lg:text-base leading-tight capitalize line-clamp-2 tracking-wider">{Article.content}</p>
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
                        <div className='p-2 text-base md:text-lg lg:text-xl gap-3 flex items-center py-7 md:py-10'>
                            <p className=' bg-[#3f2d23] uppercase -skew-x-12 text-white font-medium  p-1 px-3 tracking-wider '>Related</p>
                            <div className="h-[1px] bg-[#3f2d239e] w-full"></div>
                        </div>
                    </>
                    }
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-y-10 ">
                    {filteredArticles?.map(Article => (
                        <motion.div className="w-full object-cover" layout>
                            <SingleArticle key={Article.id} Loading={isArticleLoading} Article={Article} />
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
