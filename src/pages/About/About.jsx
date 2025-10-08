//import { useState } from "react";
import Choose from "../../components/Choose/Choose";
import Mission from "../../components/Mission/Mission";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./About.css";

function About() {
  return (
    <section className="about">
      <Navbar />
      <Mission />
      <Choose />
      <Footer />
    </section>
  );
}

export default About;
