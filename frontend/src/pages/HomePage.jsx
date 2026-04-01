import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import HeroSection from "../components/home/HeroSection";
import IntroSection from "../components/home/IntroSection";
import FeatureSection from "../components/home/FeatureSection";

function HomePage() {
  return (
    <div className="app">
      <Header />

      <main>
        <HeroSection />
        <IntroSection />
        <FeatureSection />
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;