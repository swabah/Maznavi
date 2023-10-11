import React, { useState, useEffect } from "react";
import { useQuotes } from "../../../hooks/posts"; 
import jungle from '../../../assets/Images/jungle-parliament-thumb.jpg'
import { PiArrowRightThin,PiArrowLeftThin, PiQuotesDuotone } from "react-icons/pi";

export default function HomeTwo() {
  const { quotes, isLoading } = useQuotes();

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextQuoteIndex =
        currentQuoteIndex < quotes.length - 1 ? currentQuoteIndex + 1 : 0;
      setCurrentQuoteIndex(nextQuoteIndex);
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [currentQuoteIndex, quotes.length]);

  const showPreviousQuote = () => {
    const previousQuoteIndex =
      currentQuoteIndex > 0 ? currentQuoteIndex - 1 : quotes.length - 1;
    setCurrentQuoteIndex(previousQuoteIndex);
  };

  const showNextQuote = () => {
    const nextQuoteIndex =
      currentQuoteIndex < quotes.length - 1 ? currentQuoteIndex + 1 : 0;
    setCurrentQuoteIndex(nextQuoteIndex);
  };

  return (
    <div style={{ backgroundImage: `url(${jungle})` }} className="relative bg-no-repeat bg-center w-full bg-white text-[#120f08] flex items-center justify-center shadow-sm ">
    <div className="w-full bg-black opacity-50 h-full absolute inset-0"></div>
    <div className=" z-10  lg:h-[90vh] relative w-full text-white  flex text-center items-center justify-center py-16 md:py-12 lg:px-10 xl:px-32">
    {isLoading ? <div className="w-full  h-[60vh] rounded-3xl animate-pulse bg-[#ffffff4d]"></div> : <>
      <div className="w-full rounded-t-md  h-full flex flex-row items-center p-3 md:p-8 lg:px-10 justify-center md:justify-between">
          <button
            className="text-white text-2xl lg:text-4xl"
            onClick={showPreviousQuote}
          >
            <PiArrowLeftThin/>
          </button>
        <div className="w-full max-w-lg items-center flex-col p-3 flex">
          <PiQuotesDuotone className="text-4xl md:text-5xl lg:text-6xl " />
          <h2 className="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl mt-3  py-5 lg:py-10 lg:p-5 font-normal tracking-widest whitespace-pre-line  ">
          {quotes[currentQuoteIndex]?.quote}
          </h2>
          <p className='text-xs md:text-sm lg:text-lg text-opacity-70 font-light tracking-widest  font-serif'>{quotes[currentQuoteIndex]?.Quote_writer}</p>
          
        </div>
          <button
            className="text-white text-2xl lg:text-4xl"
            onClick={showNextQuote}
          >
            <PiArrowRightThin/>
          </button>
      </div>
      </> }
      </div>
    </div>
  );
}
