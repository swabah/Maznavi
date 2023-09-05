import React from "react";
import HomeImg from '../../../assets/Images/HomeImg.png'
import { Link } from "react-router-dom";
import { AUTHORS, ARTICLES, EXPLORE, POEMS, STORIES } from "../../../App";
// import {Typewriter} from 'react-simple-typewriter'

export default function HomeSection() {
  const items = [
    {
      img : 'https://img.freepik.com/free-photo/female-tourists-spread-their-arms-held-their-wings_1150-7462.jpg?w=1060&t=st=1692131149~exp=1692131749~hmac=614aeccc6a23b5d2df231149e30aece044db9f4b4fed8e81902bdd735f8721b0',
      Which : 'Explore',
      url : EXPLORE
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
    <div className='w-full relative bg-center flex flex-col items-center justify-end object-cover bg-no-repeat bg-[#fff] text-[#f9f697] shadow-sm h-[100vh] p-3 lg:px-10 py-20 lg:py-12 xl:py-6 xl:px-32 '>
      <div className='z-20  w-full flex items-center h-auto justify-center'>
        {/* <img src={HomeImg} className="w-[40rem]"  alt="" /> */}
      </div>
      <div className='z-20 w-full flex items-center overflow-hidden overflow-x-visible h-auto py-2 px-3 space-x-5 justify-between'>
        {items.map((item,index)=>(
          <Link to={item.url}>
            <div key={index} className="w-full h-full hover:text-[#468641] text-[#3f2d23] flex flex-col items-center gap-3 md:gap-5">
              <div className="w-36 h-24 lg:w-56 lg:h-32 rounded-lg  border-4 border-transparent ring-2 ring-[#3f2d234d] overflow-hidden">
                  <img src={item.img} className="w-full opacity-90 hover:opacity-100 h-full object-cover hover:scale-125 transition-all duration-300" alt="" />
              </div>
              <h2 className="text-base capitalize tracking-wide ">{item.Which}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
