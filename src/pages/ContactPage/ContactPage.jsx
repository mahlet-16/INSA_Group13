//import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ContactHeader from "../../components/ContactHeader/ContactHeader";
import ContactInfo from "../../components/ContactInfo/ContactInfo";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import "./ContactPage.css";

function ContactPage() {
  return (
    <section className="contact-page">
      <Navbar />
      <ContactHeader />
      <ContactInfo />
      <Contact />
      <Footer />
    </section>
  );
}

export default ContactPage;
