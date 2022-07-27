import { FeatureSection } from '../components/FeatureSection';
import { Footer } from '../components/Footer';
import { HeroSection } from '../components/HeroSection';

export function LandingPage(): JSX.Element {
  return (
    <>
      <div className="overflow-hidden">
        <HeroSection />
        <FeatureSection />
      </div>
      <Footer />
    </>
  );
}
