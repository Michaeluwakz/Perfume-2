
import type { Collection } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';

interface FeaturedCollectionProps {
  collection: Collection;
}

export function FeaturedCollection({ collection }: FeaturedCollectionProps) {
  const displayProducts = collection.products.slice(0, 4); 

  if (displayProducts.length === 0) {
    return null; 
  }

  const marqueeProducts = [...displayProducts, ...displayProducts, ...displayProducts]; // Triplicate for smoother, longer marquee
  const isBestsellersCollection = collection.name === 'Bestsellers';

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-4">{collection.name}</h2>
        {collection.description && (
          <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">{collection.description}</p>
        )}
        
        <div className="overflow-hidden relative group w-full">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
            {marqueeProducts.map((product, index) => (
              <div 
                key={`${product.id}-${index}-${collection.name}`} 
                className="flex-shrink-0 w-64 sm:w-72 md:w-80 mx-3"
              >
                <ProductCard 
                  product={product} 
                  hidePrice={isBestsellersCollection}
                  hideActions={isBestsellersCollection}
                />
              </div>
            ))}
          </div>
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}
