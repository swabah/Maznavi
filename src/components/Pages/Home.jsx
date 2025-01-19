import React from "react";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import HomeTwo from "./Home/HomeTwo";
import HomeSection from "./Home/HomeSection";
import HomeThree from "./Home/HomeThree";
import HomeFive from "./Home/HomeFive";
import HomeSix from "./Home/HomeSix";
import Metatag from "../layout/Meta-tag";

export default function Home() {
  return (
    <Metatag >
      <>
        <div>
          <Navbar />
          <HomeSection />
          <HomeTwo />
          <HomeFive />
          <HomeThree />
          <HomeSix />
          <Footer />
        </div>
      </>
    </Metatag>
  );
}
