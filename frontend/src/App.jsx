import Navbar from "./components/common/Navbar";
import Spotlight from "./components/common/Spotlight";
import AnimatedBackground from "./components/common/AnimatedBackground";
import FloatingIcons from "./components/common/FloatingIcons";

import Hero from "./components/hero/Hero";
import FinancialCommandCenter from "./components/landing/FinancialCommandCenter";
import DashboardPreview from "./components/landing/DashboardPreview";

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030712] text-white">
      {/* Global Background Effects */}
      <Spotlight />
      <AnimatedBackground />
      <FloatingIcons />

      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Financial Overview */}
      <FinancialCommandCenter />

      {/* Dashboard Preview */}
      <DashboardPreview />

      {/* Upcoming Sections */}
      {/*
      <FinancialJourney />
      <RiskAnalysis />
      <InteractiveCharts />
      <AIRecommendations />
      <Testimonials />
      <Footer />
      */}
    </div>
  );
}

export default App;