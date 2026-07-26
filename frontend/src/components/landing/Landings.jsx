import Navbar from "../common/Navbar";
import Heros from "./Heros";
import Stats from "./Stats";
import WorkspacePreview from "./WorkspacePreview";
import Features from "./Features";
import FAQ from "./FAQ";
import CTA from "./CTA";
import Footer from "./Footer";

export default function Landings() {
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

