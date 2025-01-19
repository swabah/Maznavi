import React from "react";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import HomeTwo from "./Home/HomeTwo";
import HomeSection from "./Home/HomeSection";
import HomeThree from "./Home/HomeThree";
import HomeFive from "./Home/HomeFive";
import HomeSix from "./Home/HomeSix";
import { Helmet } from "react-helmet-async";
import Metatag from "../layout/Meta-tag";

export default function Home() {
  return (
    <div>
      <Metatag title="മസ്നവി 💛(60k)" description='' url={window.location.href} />
      <Navbar />
      <HomeSection />
      <HomeTwo />
      <HomeFive />
      <HomeThree />
      {/* <HomeFour/> */}
      <HomeSix />
      <Footer />
    </div>
  );
}
