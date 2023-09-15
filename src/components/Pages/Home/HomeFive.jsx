
  import React from "react";
import { usePoems } from "../../../hooks/posts";
import SinglePoem from "../../posts/SinglePoem";
import { FiTrendingUp } from "react-icons/fi";


  export default function HomeFive () {
    const {Poems, isPoemLoading} = usePoems();
  
    return (
      <div className='w-full text-[#120f08] bg-[#fff]  shadow-sm h-full p-7 lg:px-10 py-8 md:py-12 lg:pt-20 xl:px-32 '>
        <div className='p-2  gap-2 flex items-center pb-7 md:pb-14'>
          <p className='text-base md:text-lg lg:text-2xl uppercase bg-[#3f2d23] -skew-x-12 text-white font-medium gap-3 w-auto text-center md:text-start flex items-center p-1 px-3 tracking-wider '><FiTrendingUp />Trending</p>
          <div className="h-[1px] bg-[#3f2d239e] w-full"></div>
        </div>
          <div
                className='grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-4'
            >
               {Poems?.slice(0,4).map((Poem) => (
                  <SinglePoem Loading={isPoemLoading} key={Poem.id} Poem={Poem}/>
                ))}
          </div>
      </div>
    );
  }
  