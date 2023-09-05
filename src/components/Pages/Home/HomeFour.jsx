import React from 'react'
import { Link } from 'react-router-dom';
import { useArticles } from '../../../hooks/posts';

function HomeFour() {
  const { Articles } = useArticles()
 const uniqueTopics = [...new Set(Articles?.map((Article) => Article.topic))];

  return (
    <div className="w-full h-full p-7 lg:px-10 py-10 lg:py-20 xl:px-32 ">
            <div className='z-20 flex items-center justify-start w-full h-auto gap-3 overflow-hidden overflow-x-visible md:gap-5'>
              {uniqueTopics.map((topic) => (
                <div key={topic} className='relative overflow-hidden transition-all rounded cursor-pointer h-12'>
                  <Link onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} to={`/Articles/${topic}`}>
                    <img className='object-cover w-full h-full rounded' src={Articles?.find((Article) => Article.topic === topic)?.imageUrl} alt="" />
                    <div className='absolute inset-0 flex items-center justify-center w-full h-full text-lg font-medium tracking-wider text-white uppercase transition-all bg-black rounded hover:scale-105 bg-opacity-40 hover:bg-opacity-50'>{topic}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
    // <div className='w-full  text-[#3f2d23] bg-[#fff] shadow-sm h-full p-6 lg:px-10 py-16 lg:py-24 xl:px-32 '>
    //     <p className='text-lg md:text-xl font-medium tracking-wide gap-3 w-full text-center md:text-start flex items-center'><FiTrendingUp className='text-xl md:text-2xl'/>Trending on Maznavi._</p>
    //     <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-3 md:gap-5 lg:gap-8 xl:gap-5 w-full h-full'>
    //         {isLoading ? (
    //             <PostsDemo h="h-24 md:h-32 " count={8} />
    //         ) : (
    //             Poems.slice(0,8).map((Poem,index) => (
    //             <div
    //                 key={Poem.id}
    //                 className="flex flex-col md:gap-x-5 items-start w-full h-full"
    //             >
    //                 <h2 className='text-3xl md:text-4xl text-gray-300 opacity-80'>0{index + 1}</h2>
    //                 <div className="mt-2 w-full text-start md:text-start justify-start gap-1.5 flex flex-col h-full ">
    //                     <div className='flex gap-1 md:gap-2 items-center'>
    //                         {Poem?.PhotoUrl ? (
    //                         <img
    //                             src={Poem?.PhotoUrl}
    //                             className="w-7 h-7 md:w-8 md:h-8 rounded-3xl object-cover"
    //                             alt=""
    //                         />
    //                         ) : (
    //                         <div className="author-avatar w-7 h-7 md:w-8 md:h-8 bg-[#462e21e7] rounded-3xl"></div>
    //                         )}
    //                         <p className="text-sm md:text-base w-8/12 font-medium text-[#462e21] truncate">{Poem.author}</p>
    //                     </div>
    //                     <Link
    //                         to={`/Poems/id/${Poem?.id}`}
    //                         className='flex items-center hover:underline justify-start w-full '
    //                         onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
    //                     >
    //                         <h2 className="md:text-xl font-bold w-11/12 ">{Poem.title}</h2>
    //                         {/* <PiArrowLineUpRightBold className="md:text-lg"/> */}
    //                     </Link>
    //                     <p className="text-sm text-[#3f2d23bd] ">{Poem.date}</p>
    //                 </div>
    //             </div>
    //             ))
    //         )}
    //     </div>
    // </div>
  )
}

export default HomeFour