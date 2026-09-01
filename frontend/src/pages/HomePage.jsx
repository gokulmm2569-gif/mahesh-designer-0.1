import HeroSection from '../components/storefront/HeroSection';
import CollectionsSection from '../components/storefront/CollectionsSection';
import InteractiveFabricLens from '../components/storefront/InteractiveFabricLens';
import AtelierFilmShowcase from '../components/storefront/AtelierFilmShowcase';

export default function HomePage() {
  return (
    <main>
      {/* 1. Luxury Editorial Hero Section (NobleStitch + Vastrik) */}
      <HeroSection />

      {/* 2. Featured Categories & Craftsmanship Grid (Vishaka Fashion) */}
      <CollectionsSection />

      {/* 3. Haute Couture Fabric Lens & Inspection Magnifier (Motiff Bespoke) */}
      <InteractiveFabricLens />

      {/* 4. Full-Length Living Atelier Craftsmanship Film (Above Footer) */}
      <AtelierFilmShowcase />
    </main>
  );
}





