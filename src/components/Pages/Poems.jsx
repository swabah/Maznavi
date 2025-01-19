import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { usePoems } from "../../hooks/posts";
import {
  Divider,
} from "@chakra-ui/react";
import SinglePoem from "../posts/SinglePoem";
import Metatag from "../layout/Meta-tag";

export default function Poems() {
  const { Poems, isPoemLoading } = usePoems();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPoems = Poems?.filter((poem) =>
    poem.author.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <>
      <Metatag title="മസ്നവി 💛(60k) - Poems" description='' url={window.location.href} />
      <Navbar />
      <div className="w-full h-full bg-white text-[#3f2d23] min-h-screen shadow-sm p-7 py-12 lg:px-10 md:py-20 xl:px-32 ">
        <div className='h-auto py-5  relative w-full flex flex-col text-center gap-3 items-center justify-center '>
          <h2 className='text-3xl lg:text-4xl xl:text-5xl tracking-wider font-semibold'>
            <span className='text-[#3f2d23]'>Fuel Your Creativity</span> <br /> with Our Engaging Poems
          </h2>
          <p className='text-base lg:text-lg'> Discover Compelling Narratives, Beautiful Poetry, and Enthralling Articles Crafted Just for You.</p>
        </div>
        <Divider marginTop='5' />
        <input
          placeholder="🔍 Explore Poems by Authors"
          value={searchQuery}
          className="outline-[#3f2d2328] w-full mb-10  outline-dashed outline-2 p-2 px-5 rounded"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPoems?.map((Poem) => (
            <SinglePoem Loading={isPoemLoading} key={Poem.id} Poem={Poem} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
