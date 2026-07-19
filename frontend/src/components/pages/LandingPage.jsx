import Navbar from "../common/Navbar";
import Hero from "../landing/Hero";
import Stats from "../landing/Stats";
import WorkspacePreview from "../Landing/WorkspacePreview";
import Features from "../landing/Features";
import FAQ from "../landing/FAQ";
import CTA from "../landing/CTA";
import Footer from "../Landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <Hero />

      <Stats />

      <WorkspacePreview />

      <Features />

      <FAQ />

      <CTA />

      <Footer />

    </div>
  );
}