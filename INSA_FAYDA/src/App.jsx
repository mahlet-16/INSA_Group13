//import { useState } from "react";

import "./App.css";
import Hero from "./components/Home/Hero.jsx";
import About from "./components/About/About.jsx";
import HowWork from "./components/HowWork/HowWork.jsx";
import Service from "./components/Service-h/Service.jsx";
import Contact from "./components/Contact/Contact.jsx";
function App() {
  return (
    <>
      <Hero />
      <About />
      <HowWork />
      <Service />
      <Contact />
    </>
  );
}

export default App;
