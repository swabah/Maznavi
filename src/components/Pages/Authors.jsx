import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { Link as RouterLink } from "react-router-dom";
import { usePoems } from "../../hooks/posts";
import PostsDemo from "../Demo/PostsDemo";

export default function Authors() {
  const { Poems, isLoading } = usePoems();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAuthors = Poems?.filter((poem) =>
    poem.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedAuthors = filteredAuthors.reduce((authors, poem) => {
    const existingAuthor = authors.find((author) => author.author === poem.author);

    if (existingAuthor) {
      existingAuthor.poems.push(poem.title);
    } else {
      authors.push({
        author: poem.author,
        authorPhotoUrl: poem.authorPhotoUrl || null,
        poems: [poem.title.substring(0,5)],
      });
    }

    return authors;
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full h-full min-h-screen bg-white text-[#3f2d23] shadow-sm py-10 p-3 lg:px-10 md:py-12 xl:px-32">
        <input
          placeholder="🔍 Search author"
          value={searchQuery}
          className="outline-[#3f2d2328] w-full mb-10  outline-dashed outline-2 p-2 px-5 rounded"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 ">
          {isLoading ? (
            <PostsDemo h="h-32" count={6} />
          ) : (
            groupedAuthors.map((author) => (
              <div
                key={author.author}
                className="border-2 border-[#3f2d2318] hover:border-[#3f2d2328] rounded-md p-3 md:p-6 hover:inner-shadow w-full h-auto"
              >
                <RouterLink
                  to={`/authors/${author.author}`}
                  className="text-[#3f2d23] no-underline"
                >
                  <h2 className="md:text-lg hover:underline lg:text-xl truncate font-semibold tracking-wide">
                    {author.author}
                  </h2>
                </RouterLink>
                <div className="flex flex-col md:flex-row items-start gap-3 md:gap-5 mt-1 md:mt-3 w-full h-auto">
                  <RouterLink
                    to={`/authors/${author.author}`}
                    className="text-[#3f2d23] no-underline h-10 w-10 md:w-20 md:h-16 rounded-full"
                  >
                    {author.authorPhotoUrl ? (
                      <img
                        src={author.authorPhotoUrl}
                        className="w-full h-full rounded-full"
                        alt=""
                      />
                    ) : (
                      <div className="author-avatar w-full h-full bg-[#3f2d23dc] rounded-full"></div>
                    )}
                  </RouterLink>
                  <div className="md:mt-1 w-full">
                    <div className="flex items-center relative cursor-pointer hover:bg-gray-50 gap-1 rounded-3xl text-xs md:text-sm bg-black bg-opacity-0 border-[#3f2d23] border-[0.2px] p-0.5 px-2 lg:px-3">
                      {/* <PiArrowLineUpRightBold className='absolute right-0 -top-1.5 text-base p-0.5 bg-white rounded-full' /> */}
                      {author?.poems.join('... | ')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
