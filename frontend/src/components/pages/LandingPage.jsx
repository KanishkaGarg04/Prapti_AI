import Navbar from "../common/Navbar";
import Hero from "../landing/Hero";
import Features from "../landing/Features";
import CTA from "../landing/CTA";
import Footer from "../landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </>
  );
}