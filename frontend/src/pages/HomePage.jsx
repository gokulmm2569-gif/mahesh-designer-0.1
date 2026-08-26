import HeroSection from '../components/storefront/HeroSection';
import CollectionsSection from '../components/storefront/CollectionsSection';
import InteractiveFabricLens from '../components/storefront/InteractiveFabricLens';
import LiveAtelierConfigurator from '../components/storefront/LiveAtelierConfigurator';

export default function HomePage() {
  return (
    <main>
      {/* 1. Luxury Editorial Hero Section (NobleStitch + Vastrik) */}
      <HeroSection />

      {/* 2. Featured Categories & Craftsmanship Grid (Vishaka Fashion) */}
      <CollectionsSection />

      {/* 3. Haute Couture Fabric Lens & Inspection Magnifier (Motiff Bespoke) */}
      <InteractiveFabricLens />

      {/* 4. Live Digital Atelier Configurator & Blueprint (GoStitchNest + Dudduel) */}
      <LiveAtelierConfigurator />
    </main>
  );
}





