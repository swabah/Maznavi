import React from "react";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import HomeOne from "./Home/HomeOne";
import HomeTwo from "./Home/HomeTwo";
import HomeSection from "./Home/HomeSection";
import HomeThree from "./Home/HomeThree";
import HomeFour from "./Home/HomeFour";
import HomeFive from "./Home/HomeFive";
import HomeSix from "./Home/HomeSix";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HomeSection />
      {/* <HomeFour/> */}
      <HomeOne/>
      <HomeFive/>
      <HomeTwo/>
      <HomeThree/>
      <HomeSix/>
      <Footer />
    </div>
  );
}
