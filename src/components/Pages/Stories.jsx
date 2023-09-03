import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { Box, Divider } from "@chakra-ui/react";
import { useStories } from "../../hooks/posts";
import { SingleStory } from "../posts/SingleStory";

export default function Stories() {
  const {stories , isStoryLoading} = useStories()
  return (
    <>
      <Navbar />
      <div className="w-full h-full min-h-screen p-7 py-12 bg-white shadow-sm lg:px-10 md:py-20 xl:px-32 ">
        <div className="relative flex flex-col items-center justify-center w-full h-auto gap-3 py-5 text-center ">
          <h2 className="text-3xl font-semibold tracking-wider lg:text-4xl xl:text-5xl">
            <span className="text-[#3f2d23]">Unlock Your Creative Potential</span> <br /> with Enchanting Stories
          </h2>
          <p className="text-base lg:text-lg"> Embark on a journey through inspirational narratives crafted exclusively for your enjoyment.</p>
        </div>
        <Divider mt={5} mb="10" />
        <div className="grid w-full h-full grid-cols-2 gap-y-5 gap-x-2 md:gap-x-3 md:grid-cols-4 xl:grid-cols-5">
          {stories?.map((story) => (
            <SingleStory Loading={isStoryLoading} key={story.id} story={story} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
