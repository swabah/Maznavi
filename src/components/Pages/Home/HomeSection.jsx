import React from "react";
import { AUTHORS, ARTICLES,BLOGS, POEMS, STORIES } from "../../../App";
import { Link } from "react-router-dom";
import {Typewriter} from 'react-simple-typewriter'

export default function HomeSection() {
  const items = [
    {
      img : 'https://img.freepik.com/free-photo/female-tourists-spread-their-arms-held-their-wings_1150-7462.jpg?w=1060&t=st=1692131149~exp=1692131749~hmac=614aeccc6a23b5d2df231149e30aece044db9f4b4fed8e81902bdd735f8721b0',
      Which : 'Blogs',
      url : BLOGS
    },
    {
      img : 'https://img.freepik.com/free-photo/creative-reels-composition_23-2149711507.jpg?w=1060&t=st=1692130595~exp=1692131195~hmac=8d08e95504f8b6d3393f331d747dec93cb89e45916a14bc7923c290a2f6c1060',
      Which : 'Stories',
      url : STORIES
    },
    {
      img : 'https://img.freepik.com/free-photo/social-media-concept-composition_23-2150169158.jpg?w=900&t=st=1692130930~exp=1692131530~hmac=15e420d0237a2cd32e330e9e5b5e0f788cd916f2223ff52f470485a9826ca336',
      Which : 'Poems',
      url:POEMS
    },
    {
      img : 'https://img.freepik.com/free-photo/worker-reading-news-with-tablet_1162-83.jpg?w=1060&t=st=1692131217~exp=1692131817~hmac=f896bfc6dc4ce39a982f3c0fbb0dfbed8291d40b14b9135991f211e154d1ddc8',
      Which : 'Articles',
      url: ARTICLES
    },
    {
      img : 'https://img.freepik.com/free-photo/writer-work-handsome-young-writer-sitting-table-writing-something-his-sketchpad-home_155003-16691.jpg?w=1060&t=st=1692131002~exp=1692131602~hmac=9e82258cd3a1d373d999ed46f17592e9d1936833541fbe98d84c70c63cc8f14e',
      Which : 'Authors',
      url:AUTHORS
    },
  ]
  return (
    <div className='w-full relative  text-[#3f2d23] h-full flex flex-col items-center justify-start text-center gap-10   p-7 lg:px-10 py-20 lg:py-12 xl:py-6 xl:px-32'>
      <div className="h-full flex flex-col items-center justify-start text-center w-full gap-3 md:gap-4 pt-16 md:pt-24 xl:pt-44">
        <h2 className='md:w-11/12 lg:w-9/12 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium '>Exploring Lifе's Corе: Maznavi._ Guidеs You to Essеncе</h2>
        <div className=" uppercase  text-sm md:text-base xl:text-xl font-extralight traking-wide">
          <p className="">
          <Typewriter
              words = {['"Heartfelt Expressions Treasury"','"Soulful Stories"','"Words Ignite Inspiration Power"','"Gateway to Poetry and Prose"','"Celebrating Written Beauty"', '"Journey Through Literary Worlds"']}
              loop={0}
              typeSpeed={80}
              deleteSpeed={20}
              delaySpeed={1000}
              cursor
              cursorColor="green"
            />
          </p>
        </div>
        <div className="flex items-center flex-col justify-between md:flex-row gap-3 md:gap-4 mt-5">
          <div className="uppercase p-1 lg:p-3  px-2 lg:px-4 text-xs lg:text-sm text-white bg-green-600 rounded-md border-2 border border-green-600 md:border-green-600">get started for free</div>
          <div className="uppercase p-1 lg:p-3  px-2 lg:px-4 text-xs lg:text-sm text-green-600 bg-tranparent border md:border-2 border-green-600 rounded-md">get started for free</div>
        </div>
      </div>
      <div className='z-20 lg:pt-16 w-full flex items-center overflow-hidden overflow-x-visible h-auto py-2 px-3 space-x-5 justify-between'>
        {items.map((item,index)=>(
          <Link to={item.url}>
            <div key={index} className="w-full h-full hover:text-green-600 text-[#3f2d23] flex flex-col items-center gap-3 md:gap-5">
              <div className="w-32 h-20 md:w-36 md:h-24 lg:w-56 lg:h-32 rounded-lg  border-4 border-transparent ring-2 ring-[#3f2d234d] overflow-hidden">
                  <img src={item.img} className="w-full rounded-md opacity-90 hover:opacity-100 h-full object-cover hover:scale-125 transition-all duration-300" alt="" />
              </div>
              <h2 className="text-base capitalize tracking-wide ">{item.Which}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
