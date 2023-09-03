import React, { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function CurrentAuthor() {
  const { authorName } = useParams();
  const [authorPoems, setAuthorPoems] = useState([]);

  useEffect(() => {
    const fetchAuthorPoems = async () => {
      const PoemsRef = collection(db, "Poems");
      const q = query(PoemsRef , where("author", "==", authorName));

      const Poems = await getDocs(q);

      setAuthorPoems(Poems.docs.map((doc)=>({...doc.data(),id:doc.id})));
    };
    fetchAuthorPoems()
  }, [authorName]);

  console.log(authorPoems)

  return (
    <>
      <div className="w-full h-full bg-[#3f2d23] pt-32">
        <div className='w-full h-full lg-20 lg:pb-32 bg-white p-7 rounded-t-[80px]'>
        <Container maxW={"4xl"} className='text-center flex flex-col relative items-center justify-center p-7'>
          <img src={authorPoems.slice(0,1).map((img)=>(img.PhotoUrl))} className="w-28 md:w-36 h-28 md:h-36 bg-[#000] -top-16 absolute rounded-full object-cover" alt="" />
          <h2 className="py-10 md:py-16 lg:py-20 text-lg md:text-xl lg:text-2xl font-semibold">{authorName}</h2>
          <div
              className="grid  grid-cols-1 md:grid-cols-3 w-full h-full gap-3 lg:gap-8"
            >
        {authorPoems.map((Poem , index)=>(
              <Link
                  to={`/Poems/id/${Poem?.id}`}
                  className='w-full'
                  onClick={()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
                >
              <div className="w-full relative text-start justify-start flex flex-col h-full bg-white border-2 border-[#3f2d2318] hover:border-[#3f2d2328] rounded-md p-5 hover:shadow-md cursor-pointer transition-all">
                <p  className="md:text-xl hidden xl:block absolute -right-2 -top-4 bg-white p-1 px-2 rounded-full">{index+1}</p>
                <h2 className="text-xl mb-2 font-bold w-11/12 truncate ">{Poem.title}</h2>
                  <div className="whitespace-pre-line line-clamp-3">
                    {Poem.desc}
                  </div>
                  <div className="flex items-center mt-5 justify-between">
                     <h2 className="text-sm w-1/2 truncate font-medium ">{Poem.author}</h2>
                     <h2 className="text-xs ">{Poem.created.date}</h2>
                  </div>
              </div>
                </Link>
        ))}
        </div>
        </Container>
        </div>
      </div>
    </>
  );
}