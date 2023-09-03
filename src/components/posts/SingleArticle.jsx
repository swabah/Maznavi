import React from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/auths";
import { useArticleToggleLike} from "../../hooks/posts";
import { PiArrowUpRightBold,PiArrowLineUpRightThin } from "react-icons/pi";
import PostsDemo from "../Demo/PostsDemo";

export const SingleArticle = ({Article,Loading,key}) => {
  const {user, isLoading: authLoading} = useAuth();
  const { id, likes , uid } = Article;
  const isLiked = likes.includes(user?.id);
  const {toggleArticleLike, isLoading} = useArticleToggleLike({
    id,
    isLiked,
    uid: user?.id,
  });


  const imageUrl = Article.imageUrl;



  return (
    <>
    {Loading ? (
      <PostsDemo h="h-96" count={20} />
    ) : (
    <div key={key} className="w-full h-full gap-2 md:gap-4 flex flex-col">
        <div className='w-full h-full'>
          <Link
           to={`/Articles/id/${Article?.id}`}
           className='relative h-full w-full '
           onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
          >
           <img src={imageUrl} alt="" className="w-full h-52 hover:scale-110 duration-300 rounded-t-lg transition-all object-cover" />
           <div className='absolute inset-0 w-full h-full bg-[#0000003b] rounded-t-lg flex items-center opacity-0 hover:opacity-100 transition-all justify-center text-white text-5xl'><PiArrowLineUpRightThin/></div>
          </Link>
        </div>
        <div className=" text-[#3f2d23] h-full w-full gap-1 lg:gap-1.5 flex flex-col justify-start items-start ">
                <div className='opacity-90 w-full flex gap-1 flex-row justify-start items-center '>
                  <Link onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} to={`/Articles/${Article?.topic}`}>
                     <h2 className=" uppercase font-semibold">{Article.topic}</h2>
                  </Link>
                  |
                  <p className="text-xs md:text-base text-[#3f2d23] "> {Article.created.date}</p>
                </div>
               <Link
                  to={`/Articles/id/${Article?.id}`}
                  className='flex items-center hover:underline justify-between w-full'
                  onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
                >
                    <h2 className='text-lg md:text-xl w-11/12 truncate'>{Article.title}</h2>
                    <PiArrowUpRightBold className="md:text-lg"/>
                </Link>
        </div>
    </div>
    )}
    </>
  );
};

