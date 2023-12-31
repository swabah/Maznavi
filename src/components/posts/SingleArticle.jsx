import React from "react";
import { Link } from "react-router-dom";
import { PiArrowUpRightBold, PiArrowLineUpRightThin } from "react-icons/pi";
import formatTimeDifference from "../../assets/formatTime";

export const SingleArticle = ({ Article, Loading, key }) => {


  const imageUrl = Article.imageUrl;


  return (
    <>
      {Loading ? (
        <div className="w-full h-[40vh] rounded-3xl animate-pulse bg-gray-100"></div>
      ) : (
        <div key={key} className="flex flex-col w-full h-full gap-2 md:gap-4">
            <Link
              to={`/Articles/id/${Article?.id}`}
              className='relative w-full h-full '
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            >
              <img src={imageUrl} alt="" className="object-cover w-full transition-all duration-300 rounded-t-lg h-52 " />
              <div className='absolute inset-0 w-full h-full bg-[#0000003b] rounded-t-lg flex items-center opacity-0 hover:opacity-100 transition-all justify-center text-white text-5xl'><PiArrowLineUpRightThin /></div>
              {/*<div className='absolute backdrop-blur text-sm md:text-base bg-opacity-40 top-2 left-2 z-20 w-auto h-auto text-white bg-[#000] rounded-md flex items-center gap-2 p-1 px-2 '>
            <AiOutlineRead/>
            <h2 className='font-sans text-xs font-extralight'>{readtime}</h2>
          </div>*/}
            </Link>
          <div className=" text-[#3f2d23] h-full w-full gap-1 lg:gap-1.5 flex flex-col justify-start items-start ">
            <div className='flex flex-row items-center justify-start w-full gap-1 opacity-90 '>
              <Link onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} to={`/Articles/${Article?.topic}`}>
                <h2 className="font-semibold uppercase ">{Article.topic}</h2>
              </Link>
              |
              <p className="text-xs md:text-base text-[#3f2d23] ">{formatTimeDifference(Article?.created)}</p>
            </div>
            <Link
              to={`/Articles/id/${Article?.id}`}
              className='flex items-center justify-between w-full hover:underline'
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            >
              <h2 className='w-11/12 text-lg truncate md:text-xl'>{Article.title}</h2>
              <PiArrowUpRightBold className="md:text-lg" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

