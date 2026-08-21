import HeroSection from '../components/storefront/HeroSection';
import CollectionsSection from '../components/storefront/CollectionsSection';
import InteractiveFabricLens from '../components/storefront/InteractiveFabricLens';
import LiveAtelierConfigurator from '../components/storefront/LiveAtelierConfigurator';

export default function HomePage() {
  return (
    <main>
      {/* 1. Luxury Editorial Hero Section */}
      <HeroSection />

      {/* 2. Featured Categories Grid */}
      <CollectionsSection />


      {/* 4. SPECIAL FEATURE: Interactive Haute Couture Fabric Lens & 2.5x Zoom Magnifier */}
      <InteractiveFabricLens />

      {/* 5. SPECIAL FEATURE: Live Atelier 3D Silhouette Customizer & Price Calculator */}
      <LiveAtelierConfigurator />
    </main>
  );
}




