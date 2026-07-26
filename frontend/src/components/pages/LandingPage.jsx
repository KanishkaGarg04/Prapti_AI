import Navbar from "../common/Navbar";

import Hero from "../landing/Hero";
import Stats from "../landing/Stats";
import WorkspacePreview from "../landing/WorkspacePreview";
import Features from "../landing/Features";
import FAQ from "../landing/FAQ";
import CTA from "../landing/CTA";
import Footer from "../landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      <Navbar />

      <main className="w-full">
        <section id="home">
          <Hero />
        </section>

        <Stats />

        <WorkspacePreview />

        <section id="features">
          <Features />
        </section>

        <section id="faq">
          <FAQ />
        </section>

        <CTA />
      </main>

      <Footer />
    </div>
  );
}