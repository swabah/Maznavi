import React from "react";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import HomeTwo from "./Home/HomeTwo";
import HomeSection from "./Home/HomeSection";
import HomeThree from "./Home/HomeThree";
import HomeFive from "./Home/HomeFive";
import HomeSix from "./Home/HomeSix";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>മസ്നവി 💛(60k) </title>
        <meta name="description" content="Exploring Lifе's Corе: Maznavi._ Guidеs You to Essеncе" />
      </Helmet>
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
