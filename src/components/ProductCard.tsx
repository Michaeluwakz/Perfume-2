
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast'; 

interface ProductCardProps {
  product: Product;
  hidePrice?: boolean;
  hideActions?: boolean;
}

export function ProductCard({ product, hidePrice = false, hideActions = false }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = () => {
    console.log(`Added ${product.name} to cart.`);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col h-full">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} aria-label={`View details for ${product.name}`}>
          <div className="aspect-square relative w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={product.dataAiHint || 'perfume bottle'}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="hover:text-primary">
          <CardTitle className="text-lg font-headline mb-1 truncate">{product.name}</CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
        {!hidePrice && <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>}
      </CardContent>
      {!hideActions && (
        <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto flex-1 border-primary text-primary hover:bg-primary/10" asChild>
            <Link href={`/products/${product.id}`} className="flex items-center justify-center">
              <Eye className="mr-2 h-4 w-4" /> Quick View
            </Link>
          </Button>
          <Button 
            variant="default" 
            className="w-full sm:w-auto flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
