import {motion} from "framer-motion";
import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'tailwindcss/tailwind.css';
import {Pagination ,Autoplay } from 'swiper/modules';

import {SingleArticle} from "../../posts/SingleArticle";
import { useArticles } from "../../../hooks/posts";


  export default function HomeThree () {
    const {Articles, isArticleLoading} = useArticles();
  
    return (
      <div className='w-full text-[#120f08] bg-[#fff]  shadow-sm h-full p-7 lg:px-10 md:py-12 lg:pt-20 xl:px-32 '>
        <div className='p-2  gap-2 flex items-center pb-7 md:pb-14'>
          <p className='text-sm md:text-lg lg:text-2xl uppercase bg-[#3f2d23] -skew-x-12 text-white font-medium  p-1 px-3 tracking-wider '>Articles</p>
          <div className="h-[1px] bg-[#3f2d239e] w-full"></div>
        </div>
            <div
                className='relative w-full h-full justify-between items-center gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            >
                {Articles?.slice(0,4).map(Article => (
                  <SwiperSlide className="" key={Article.id} >
                   <motion.div className='w-full h-auto' layout>
                        <SingleArticle Article={Article} />
                    </motion.div>
                </SwiperSlide>
                ))}
            </div>
            <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 1400,
                  disableOnInteraction: false,
                  pauseOnMouseEnter:true,
                }}
                breakpoints={{
                '@0.00': {
                    slidesPerView: 1,
                    spaceBetween: 5,
                },
                '@0.75': {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                '@1.00': {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                '@1.50': {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                }}
                modules={[Pagination,Autoplay]}
                className='relative w-full h-full overflow-y-visible'
            >
                {Articles?.slice(4,8).map(Article => (
                  <SwiperSlide className="" key={Article.id} >
                   <motion.div className='w-full h-auto' layout>
                        <SingleArticle Article={Article} />
                    </motion.div>
                </SwiperSlide>
                ))}
            </Swiper>
      </div>
    );
  }
  