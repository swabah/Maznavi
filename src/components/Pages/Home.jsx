import React from "react";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import HomeTwo from "./Home/HomeTwo";
import HomeSection from "./Home/HomeSection";
import HomeThree from "./Home/HomeThree";
import HomeFive from "./Home/HomeFive";
import HomeSix from "./Home/HomeSix";

export default function Home() {
  return (
    <div>
      <Navbar/>
       <HomeSection />
       {/*<HomeOne/>*/}
       <HomeTwo/>
      <HomeFive/>
      <HomeThree/>
      {/* <HomeFour/> */}
      <HomeSix/>
      <Footer />
    </div>
  );
}
