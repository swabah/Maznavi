import { motion } from "framer-motion";
import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'tailwindcss/tailwind.css';
import { Pagination, Autoplay } from 'swiper/modules';

import { SingleArticle } from "../../posts/SingleArticle";
import { useArticles } from "../../../hooks/posts";
import HeaderBtn from "../../../assets/HeaderBtn";


export default function HomeThree() {
    const { Articles, isArticleLoading } = useArticles();

    return (
        <div className='w-full text-[#120f08] bg-[#fff]  shadow-sm h-full p-7 lg:px-10 md:py-12 lg:pb-20 xl:px-32 '>
            <HeaderBtn Head='Articles' />
            <div className="flex flex-col gap-5">
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 1000,
                        pauseOnMouseEnter: true,
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
                    modules={[Pagination, Autoplay]}
                    className='relative w-full h-full overflow-y-visible'
                >
                    {Articles?.slice(0, 4).map(Article => (
                        <SwiperSlide className="" key={Article.id} >
                            <motion.div className='w-full h-auto' layout>
                                <SingleArticle Article={Article} />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
