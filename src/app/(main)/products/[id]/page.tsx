'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProductById } from '@/data/products';
import type { Product, Review as ReviewType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const StarRating = ({ rating, totalStars = 5 }: { rating: number, totalStars?: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${index < rating ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: ReviewType }) => (
  <Card className="mb-4 bg-muted/50">
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-md font-headline">{review.author}</CardTitle>
        <StarRating rating={review.rating} />
      </div>
      <CardDescription className="text-xs">{new Date(review.date).toLocaleDateString()}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm">{review.comment}</p>
    </CardContent>
  </Card>
);

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (params.id) {
      const fetchedProduct = getProductById(params.id);
      setProduct(fetchedProduct || null);
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Product not found.</h1>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    console.log(`Added ${product.name} to cart.`);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square relative w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            data-ai-hint={product.dataAiHint || 'perfume bottle'}
          />
        </div>
        
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">{product.name}</h1>
          <p className="text-xl text-muted-foreground mb-4">{product.brand}</p>
          
          <div className="flex items-center mb-4">
            {product.reviews && product.reviews.length > 0 && (
              <>
                <StarRating rating={product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length} />
                <span className="ml-2 text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
              </>
            )}
          </div>

          <p className="text-3xl font-semibold text-primary mb-6">${product.price.toFixed(2)}</p>
          
          <Badge variant="secondary" className="mb-4 bg-secondary text-secondary-foreground">{product.fragranceFamily}</Badge>

          <p className="text-foreground/80 mb-6 leading-relaxed">{product.description}</p>
          
          <Button size="lg" className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
          </p>
        </div>
      </div>

      <Separator className="my-12" />

      {product.reviews && product.reviews.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold font-headline mb-6">Customer Reviews</h2>
          {product.reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
