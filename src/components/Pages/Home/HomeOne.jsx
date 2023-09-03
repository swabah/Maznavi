import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'tailwindcss/tailwind.css';
import {Pagination ,Autoplay } from 'swiper/modules';

import {SingleStory} from "../../posts/SingleStory";
import { useStories } from "../../../hooks/posts";


export default function HomeOne () {
  const {stories, isStoryLoading} = useStories();

  return (
    <div className='w-full  text-[#3f2d23] bg-[#fff] shadow-sm h-full p-7 lg:px-10 py-8 md:py-12 lg:pt-20 xl:px-32 '>
         <div className='p-2 text-sm md:text-lg lg:text-2xl gap-3 flex items-center pb-7 md:pb-14'>
          <p className=' bg-[#3f2d23] uppercase -skew-x-12 text-white font-medium  p-1 px-3 tracking-wider '>Stories</p>
          <div className="h-[1px] bg-[#3f2d239e] w-full"></div>
        </div>
        <div className='w-full flex flex-col gap-5'>
          <Swiper
              loop={true}
              autoplay={{
                delay: 1400,
                disableOnInteraction: false,
                pauseOnMouseEnter:true,
              }}
              breakpoints={{
              '@0.00': {
                  slidesPerView: 2,
                  spaceBetween: 5,
              },
              '@0.75': {
                  slidesPerView: 2,
                  spaceBetween: 5,
              },
              '@1.00': {
                  slidesPerView: 3,
                  spaceBetween: 15,
              },
              '@1.50': {
                  slidesPerView: 5,
                  spaceBetween: 10,
              },
              }}
              modules={[Pagination,Autoplay]}
              className='relative w-full h-full overflow-y-visible'
          >
              {stories?.slice(0,5).map((story) => (
              <SwiperSlide>
                <SingleStory Loading={isStoryLoading} key={story.id} story={story} />
              </SwiperSlide>
              ))}
          </Swiper>
          {/* <Swiper
              loop={true}
              autoplay={{
                delay: 1400,
                disableOnInteraction: false,
                pauseOnMouseEnter:true,
              }}
              breakpoints={{
              '@0.00': {
                  slidesPerView: 2,
                  spaceBetween: 5,
              },
              '@0.75': {
                  slidesPerView: 2,
                  spaceBetween: 5,
              },
              '@1.00': {
                  slidesPerView: 3,
                  spaceBetween: 15,
              },
              '@1.50': {
                  slidesPerView: 5,
                  spaceBetween: 10,
              },
              }}
              modules={[Pagination,Autoplay]}
              className='relative w-full h-full overflow-y-visible'
          >
              {stories?.slice(5,10).map((story) => (
              <SwiperSlide>
                <SingleStory Loading={isStoryLoading} key={story.id} story={story} />
              </SwiperSlide>
              ))}
          </Swiper> */}
        </div>
    </div>
  );
}
