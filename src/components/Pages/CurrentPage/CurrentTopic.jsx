import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../lib/firebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import { SingleArticle } from "../../posts/SingleArticle";
import PostsDemo from "../../Demo/PostsDemo";
import { motion } from "framer-motion";

export default function CurrentTopic() {
  const { Topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isArticleLoading, setArticleLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles?.filter((Article) =>
     Article.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const q = query(collection(db, "Articles"), where("topic", "==", Topic));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedArticles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(updatedArticles);
    });

    return () => {
      unsubscribe();
    };
  }, [Topic]);

  return (
    <>
      <Navbar />
      <div className="w-full h-full min-h-screen bg-white shadow-sm py-12 p-7 lg:px-10 md:py-20 xl:px-32 ">
        <input
            placeholder={`🔍 Explore ${Topic}`}
            value={searchQuery}
            className="outline-[#3f2d2328] hidden placeholder:capitalize w-full mb-10  outline-dashed outline-2 p-2 px-5 rounded"
            onChange={(e) => setSearchQuery(e.target.value)}
            />  
      <div className='p-2 text-base md:text-lg lg:text-2xl gap-3 flex items-center pb-7 md:pb-10'>
          <div className="h-[1px] bg-[#3f2d239e] w-1/2"></div>
          <p className=' bg-[#3f2d23] uppercase -skew-x-12 text-white font-medium  p-1 px-3 tracking-wider '>{Topic}</p>
          <div className="h-[1px] bg-[#3f2d239e] w-1/2"></div>
        </div>
        <div className='grid grid-cols-1  w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-y-10 '>
            {isArticleLoading ? (
                <PostsDemo h='h-72' count={filteredArticles?.length} />
            ) : (
                filteredArticles.map((article) => (
                    <motion.div className=' h-full'>
                        <SingleArticle Article={article}/>
                    </motion.div>
                ))
            )}
        </div>
      </div>

      <Footer />
    </>
  );
}
