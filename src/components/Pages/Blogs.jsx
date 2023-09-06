import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { motion } from "framer-motion";
import { useBlogs } from "../../hooks/posts";
import { SingleBlog } from "../posts/SingleBlog";
import HeaderBtn from "../../assets/HeaderBtn";

export default function Blogs() {
    const {Blogs,isBlogLoading} =useBlogs()

    return (
        <>
            <Navbar />
            <div className="w-full h-full min-h-screen py-12 bg-white shadow-sm p-7 lg:px-10 md:py-20 xl:px-32 ">
                <div className='relative flex flex-col items-center justify-center w-full h-auto gap-3 py-5 text-center '>
                    <h2 className='text-3xl font-semibold tracking-wider lg:text-4xl xl:text-5xl'>
                        <span className='text-[#3f2d23]'>Stimulate Your Imagination</span> <br /> with Our Diverse Blog Content
                    </h2>
                    <p className='text-base lg:text-lg'>Discover Captivating Narratives, Inspiring Poetry, and Tailored Articles for Your Pleasure</p>
                </div>
                <div className='my-16 grid w-full min-h-[60vh] grid-cols-1 gap-5 md:grid-cols-2'>
                    {Blogs?.slice(0, 1).map((blog) => (
                        <img
                        key={blog.id}
                        className="object-cover w-full h-full bg-[#3f2d23] border rounded-md shadow-md"
                        src={blog?.BlogImgUrl}
                        alt="Blog image"
                        />
                    ))}
                    <div className='grid w-full h-full gap-3 lg:gap-5 grid-cols-2'>
                        {Blogs?.slice(1, 5).map((blog) => (
                        <img
                            key={blog.id}
                            className=" object-cover w-full h-full bg-[#3f2d23] border rounded-md shadow-md"
                            src={blog?.BlogImgUrl}
                            alt="Blog image"
                        />
                        ))}
                    </div>
                </div>
                <HeaderBtn Head='related' />
                <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-y-10 ">
                    {Blogs?.map(Blog => (
                        <motion.div className="object-cover w-full" layout>
                            <SingleBlog key={Blog.id} Loading={isBlogLoading} Blog={Blog} />
                        </motion.div>
                    ))}
                </div>
               
            </div>
            <Footer />
        </>
    );
}
