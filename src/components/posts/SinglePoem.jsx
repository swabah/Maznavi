import React from "react";
import { Link } from "react-router-dom";
import { PiArrowLineUpRightBold } from "react-icons/pi";
import formatTime from "../../assets/formatTime";

function SinglePoem({ Poem, Loading }) {

  return (
    <div>
      {Loading ? (
        <div className="w-full h-[40vh] rounded-3xl animate-pulse bg-gray-100"></div>
      ) : (
        <div
          className="bg-white border-2 border-[#3f2d2318] hover:border-[#3f2d2328] rounded-md p-3 md:p-6 hover:shadow-md cursor-pointer transition-all"
        >
          <div className="w-full text-start justify-start flex flex-col h-full grid-item">
            <div className="mb-2 ">
              <Link onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }} to={`/${Poem?.author}`} >
                <p className="text-sm text-[#462e21] ">{Poem?.author}</p>
              </Link>
              <p className="text-xs text-[#3f2d23] ">{formatTime(Poem?.created)}</p>
            </div>
            <Link
              to={`/Poems/id/${Poem?.id}`}
              className='flex items-center hover:underline justify-between w-full mb-2'
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            >
              <h2 className="text-xl font-bold w-11/12 truncate ">{Poem?.poemTitle}</h2>
              <PiArrowLineUpRightBold className="md:text-lg" />
            </Link>
            <div className="overflow-hidden text-sm md:text-base tracking-wide line-clamp-6">
              {Poem?.poemDesc?.substring(0, 150).split("\n")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SinglePoem;
