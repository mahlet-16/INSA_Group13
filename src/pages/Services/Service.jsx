//import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Service.css";
import ServiceHeader from "../../components/ServiceHeader/ServiceHeader";
import Reliable from "../../components/Reliable/Reliable";
import Offer from "../../components/Offer/Offer";
import Footer from "../../components/Footer/Footer";

function Service() {
  return (
    <>
      <Navbar />
      <ServiceHeader />
      <Reliable />
      <Offer />
      <Footer />
    </>
  );
}

export default Service;
