import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { useArticles, usePoems } from "../../hooks/posts";
import { Link } from "react-router-dom";
import SinglePoem from "../posts/SinglePoem";
import { PiArrowLineUpRightBold } from "react-icons/pi";

export default function Explore() {
  const {Articles} = useArticles()
  const {Poems} = usePoems()

  // Create a mapping of unique topics to their associated articles
  const uniqueTopics = [...new Set(Articles?.map((Article) => Article.topic))];

  return (
    <>
    <Navbar/>
       <div className="w-full text-[#3f2d23] min-h-screen bg-[#3f2d2311] shadow-sm h-full p-7 lg:px-10 py-16 lg:py-20 xl:px-32 ">
          <div className='grid w-full min-h-[60vh] grid-cols-1 gap-5 md:grid-cols-2'>
             <img className="object-cover w-full h-full bg-red-300 border rounded-md shadow-md" src="https://img.freepik.com/free-photo/creative-reels-composition_23-2149711507.jpg?w=1060&t=st=1692130595~exp=1692131195~hmac=8d08e95504f8b6d3393f331d747dec93cb89e45916a14bc7923c290a2f6c1060" alt="" />
             <div className='grid w-full h-full grid-cols-1 gap-5 md:grid-cols-2'>
                <img className="object-cover w-full h-full bg-red-300 border rounded-md shadow-md" src="https://img.freepik.com/free-photo/creative-reels-composition_23-2149711507.jpg?w=1060&t=st=1692130595~exp=1692131195~hmac=8d08e95504f8b6d3393f331d747dec93cb89e45916a14bc7923c290a2f6c1060" alt="" />
                <img className="object-cover w-full h-full bg-red-300 border rounded-md shadow-md" src="https://img.freepik.com/free-photo/creative-reels-composition_23-2149711507.jpg?w=1060&t=st=1692130595~exp=1692131195~hmac=8d08e95504f8b6d3393f331d747dec93cb89e45916a14bc7923c290a2f6c1060" alt="" />
                <img className="object-cover w-full h-full bg-red-300 border rounded-md shadow-md" src="https://img.freepik.com/free-photo/creative-reels-composition_23-2149711507.jpg?w=1060&t=st=1692130595~exp=1692131195~hmac=8d08e95504f8b6d3393f331d747dec93cb89e45916a14bc7923c290a2f6c1060" alt="" />
                <img className="object-cover w-full h-full bg-red-300 border rounded-md shadow-md" src="https://img.freepik.com/free-photo/creative-reels-composition_23-2149711507.jpg?w=1060&t=st=1692130595~exp=1692131195~hmac=8d08e95504f8b6d3393f331d747dec93cb89e45916a14bc7923c290a2f6c1060" alt="" />
             </div>
          </div>
          <div className="w-full py-20 ">
            <div className='flex items-center gap-2 p-2 pb-7 md:pb-14'>
              <p className='text-sm md:text-lg lg:text-2xl uppercase bg-[#3f2d23] -skew-x-12 text-white font-medium  p-1 px-3 tracking-wider '>Topics</p>
              <div className="h-[1px] bg-[#3f2d239e] w-full"></div>
            </div>
            <div className='z-20 flex items-center justify-start w-full h-auto gap-3 overflow-hidden overflow-x-visible md:gap-5'>
              {uniqueTopics.map((topic) => (
                <div key={topic} className='relative overflow-hidden transition-all rounded-lg cursor-pointer h-44'>
                  <Link onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} to={`/Articles/${topic}`}>
                    <img className='object-cover w-full h-full rounded-lg' src={Articles?.find((Article) => Article.topic === topic)?.imageUrl} alt="" />
                    <div className='absolute inset-0 flex items-center justify-center w-full h-full text-lg font-medium tracking-wider text-white uppercase transition-all bg-black rounded-lg hover:scale-105 bg-opacity-40 hover:bg-opacity-50'>{topic}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-full">
            <div className='flex items-center gap-2 p-2 pb-7 md:pb-14'>
              <p className='text-sm md:text-lg lg:text-2xl uppercase bg-[#3f2d23] -skew-x-12 text-white font-medium  p-1 px-3 tracking-wider '>Poems</p>
              <div className="h-[1px] bg-[#3f2d239e] w-full"></div>
            </div>
            <div className='grid w-full h-full grid-cols-1 gap-5 md:grid-cols-4'>
                {Poems?.slice(0,8).map((Poem)=>(
                  <Link key={Poem.id} to={`/Poems/id/${Poem?.id}`} className='relative border-2 hover:border-0 hover:bg-[#3f2d2311] border-[#3f2d2318] hover:border-[#3f2d2328] rounded-md p-4 md:p-6 hover:shadow-md cursor-pointer transition-all' onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} >
                        <div className="flex justify-start w-full h-full text-center">
                            <div className="text-base tracking-wide whitespace-pre-wrap line-clamp-6">
                              {Poem.desc}
                            </div>
                        </div>
                  </Link>
                ))}
            </div>
          </div>
          
       </div>
    <Footer/>
    </>
  );
}
