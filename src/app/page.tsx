import { HeroBanner } from '@/components/HeroBanner';
import { FeaturedCollection } from '@/components/FeaturedCollection';
import { mockProducts, getProductsByCategory } from '@/data/products';
import type { Collection } from '@/lib/types';

export default function HomePage() {
  const bestsellerCollection: Collection = {
    name: 'Bestsellers',
    description: 'Our most loved and popular fragrances.',
    products: getProductsByCategory('Bestsellers'),
  };

  const newArrivalsCollection: Collection = {
    name: 'New Arrivals',
    description: 'Discover the latest additions to our curated selection.',
    products: getProductsByCategory('New Arrivals'),
  };

   const seasonalPicksCollection: Collection = {
    name: 'Seasonal Picks',
    description: 'Handpicked scents perfect for the current season.',
    products: getProductsByCategory('Seasonal Picks'),
  };

  return (
    <>
      <HeroBanner />
      <FeaturedCollection collection={bestsellerCollection} />
      <FeaturedCollection collection={newArrivalsCollection} />
      <FeaturedCollection collection={seasonalPicksCollection} />
    </>
  );
}
