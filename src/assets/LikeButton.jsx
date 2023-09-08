import React from 'react';
import { AiOutlineLike, AiFillLike, AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { REGISTER } from '../App';

function LikeButton({ one, isLiked, two, toggleStoryLike, count, user }) {
  const navigate = useNavigate();

  const LikeStory = () => {
    if (user) {
      toggleStoryLike();
    } else {
      navigate(REGISTER);
    }
  }

  return (
    <div className="p-0.5 md:p-2 flex items-start justify-center text-lg md:text-xl bg-transparent text-white md:text-[#3f2d23] md:bg-white space-x-1.5  rounded-xl md:hover:bg-gray-100">
      {(one || two) ? (
        <AiOutlineLoading className='animate-spin transition-all duration-500' />
      ) : (
        <button onClick={LikeStory}>
          {isLiked ? <AiFillLike className="font-thin" /> : <AiOutlineLike className="font-thin" />}
        </button>
      )}
      {count > 0 && <h2 className="font-medium opacity-80 text-sm">{count}</h2>}
    </div>
  );
}

export default LikeButton;
