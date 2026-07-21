import Navbar from "../common/Navbar";
import Hero from "./Hero";
import Stats from "./Stats";
import WorkspacePreview from "./WorkspacePreview";
import Features from "./Features";
import FAQ from "./FAQ";
import CTA from "./CTA";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div id="home">
        <Hero />
      </div>

      <Stats />

      <WorkspacePreview />

      <div id="features">
        <Features />
      </div>

      <div id="faq">
          <FAQ />
        </div>

      <CTA />

      <Footer />

    </div>
  );
}