import HeroSection from '../components/storefront/HeroSection';
import CollectionsSection from '../components/storefront/CollectionsSection';
import InteractiveFabricLens from '../components/storefront/InteractiveFabricLens';

export default function HomePage() {
  return (
    <main>
      {/* 1. Luxury Editorial Hero Section */}
      <HeroSection />

      {/* 2. Featured Categories Grid */}
      <CollectionsSection />

      {/* 3. Haute Couture Fabric Lens & Inspection Magnifier */}
      <InteractiveFabricLens />
    </main>
  );
}





