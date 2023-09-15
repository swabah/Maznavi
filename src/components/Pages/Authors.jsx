import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { Link as RouterLink } from "react-router-dom";
import { usePoems } from "../../hooks/posts";
import userDemo from '../../assets/Images/user.png'

export default function Authors() {
  const { Poems, isLoading } = usePoems();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAuthors = Poems?.filter((poem) =>
    poem.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      {isLoading ? 'Loding' : (
        <div className="w-full h-full min-h-screen bg-white text-[#3f2d23] shadow-sm py-10 p-3 lg:px-10 md:py-12 xl:px-32">
          <input
            placeholder="🔍 Search author"
            value={searchQuery}
            className="outline-[#3f2d2328] w-full mb-10  outline-dashed outline-2 p-2 px-5 rounded"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 ">
                {filteredAuthors.map((auth)=>(
                  <div className="border-2 border-[#3f2d2318] hover:border-[#3f2d2328] rounded-md p-3 md:p-6 hover:inner-shadow w-full h-auto">
                    <RouterLink
                      to={`/${auth.author}`}
                      className="text-[#3f2d23] no-underline"
                    >
                      <h2 className="md:text-lg hover:underline lg:text-xl truncate font-semibold tracking-wide">
                        {auth?.author}
                      </h2>
                    </RouterLink>
                    <div className="flex flex-col md:flex-row items-start gap-3 md:gap-5 mt-1 md:mt-3 w-full h-auto">
                      <RouterLink
                        to={`/${auth.author}`}
                        className="text-[#3f2d23] no-underline h-10 w-10 md:w-20 md:h-20 rounded-full"
                      >
                      {auth?.PhotoUrl ? (
                        <img
                          src={auth?.PhotoUrl}
                          className="w-full h-full rounded-full"
                          alt=""
                        />
                      ):(
                        <img
                          src={userDemo}
                          className="w-full h-full rounded-full"
                          alt=""
                        />
                      )}
                      </RouterLink>
                      <div className="md:mt-1 w-full">
                        <div className="flex items-center relative cursor-pointer hover:bg-gray-50 gap-1 rounded-3xl text-xs md:text-sm bg-black bg-opacity-0 border-[#3f2d23] border-[0.2px] p-0.5 px-2 lg:px-3">
                            {auth?.poemTitle?.substring(0, 5)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      )}
      <Footer />
    </>
  );
}
