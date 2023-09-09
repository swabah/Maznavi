import React from "react";
import {useAuth} from "../../hooks/auths";
import {Link} from "react-router-dom";
import { PiArrowLineUpRightBold } from "react-icons/pi";
import PostsDemo from "../Demo/PostsDemo";
import formatTime from "../../assets/formatTime";

function SinglePoem({ Poem,Loading,key }) {
  const { user, isLoading: authLoading } = useAuth();
  const { id, likes = [], uid } = Poem; // Initialize likes array if it's undefined
  const isLiked = likes.includes(user?.id);

  

  return (
    <>
     {Loading ? (
      <PostsDemo h="h-96" count={20} />
    ) : (
      <div
        key={key}
        className="bg-white border-2 border-[#3f2d2318] hover:border-[#3f2d2328] rounded-md p-3 md:p-6 hover:shadow-md cursor-pointer transition-all"
      >
        <div className="w-full text-start justify-start flex flex-col h-full grid-item">
          <div className="mb-2 ">
            <Link to={`/authors/${Poem?.author}`} >
             <p className="text-sm text-[#462e21] ">{Poem.author}</p>
            </Link>
            <p className="text-xs text-[#3f2d23] ">{formatTime(Poem.created)}</p>
          </div>
          <Link
            to={`/Poems/id/${Poem?.id}`}
            className='flex items-center hover:underline justify-between w-full mb-2'
            onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
          >
              <h2 className="text-xl font-bold w-11/12 truncate ">{Poem.title}</h2>
              <PiArrowLineUpRightBold className="md:text-lg"/>
          </Link>
            <div className="overflow-hidden text-sm md:text-base tracking-wide line-clamp-6">
              {Poem.desc.substring(0, 150).split("\n")}
            </div>
        </div>
      </div>
    )}
    </>
  );
}

export default SinglePoem;
