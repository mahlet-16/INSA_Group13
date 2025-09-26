//import { useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import AboutFayda from "../../components/AboutFayda/AboutFayda";
import HowWork from "../../components/HowWork/HowWork";
import OurService from "../../components/OurService/OurService";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutFayda />
      <HowWork />
      <OurService />
      <Footer />
    </>
  );
}

export default Home;
