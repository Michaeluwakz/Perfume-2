
'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/data/products';
import type { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const BRANDS = Array.from(new Set(mockProducts.map(p => p.brand)));
const FRAGRANCE_FAMILIES = Array.from(new Set(mockProducts.map(p => p.fragranceFamily)));
const MAX_PRICE = Math.max(...mockProducts.map(p => p.price), 100);


export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);


  useEffect(() => {
    let products = mockProducts;

    if (searchTerm) {
      products = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedBrands.length > 0) {
      products = products.filter(p => selectedBrands.includes(p.brand));
    }
    if (selectedFamilies.length > 0) {
      products = products.filter(p => selectedFamilies.includes(p.fragranceFamily));
    }
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setFilteredProducts(products);
  }, [searchTerm, selectedBrands, selectedFamilies, priceRange]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleFamilyChange = (family: string) => {
    setSelectedFamilies(prev =>
      prev.includes(family) ? prev.filter(f => f !== family) : [...prev, family]
    );
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrands([]);
    setSelectedFamilies([]);
    setPriceRange([0, MAX_PRICE]);
  };

  const FiltersComponent = () => (
    <div className="space-y-6 p-4 md:p-0">
      <div>
        <Label htmlFor="search" className="text-lg font-semibold font-headline">Search</Label>
        <Input 
          id="search"
          placeholder="Search perfumes..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="mt-2"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold font-headline mb-2">Brand</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {BRANDS.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox 
                id={`brand-${brand}`} 
                checked={selectedBrands.includes(brand)} 
                onCheckedChange={() => handleBrandChange(brand)}
              />
              <Label htmlFor={`brand-${brand}`} className="font-normal">{brand}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold font-headline mb-2">Fragrance Family</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {FRAGRANCE_FAMILIES.map(family => (
            <div key={family} className="flex items-center space-x-2">
              <Checkbox 
                id={`family-${family}`} 
                checked={selectedFamilies.includes(family)} 
                onCheckedChange={() => handleFamilyChange(family)}
              />
              <Label htmlFor={`family-${family}`} className="font-normal">{family}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold font-headline mb-2">Price Range</h3>
        <Slider 
          min={0} 
          max={MAX_PRICE} 
          step={10} 
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          className="mt-2"
        />
        <p className="text-sm text-muted-foreground mt-1">
          ${priceRange[0]} - ${priceRange[1]}
        </p>
      </div>
      <Button onClick={clearFilters} variant="outline" className="w-full">
        <X className="mr-2 h-4 w-4" /> Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="lg:max-w-7xl md:max-w-5xl sm:max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-headline">Our Perfumes</h1>
          <p className="text-lg text-muted-foreground mt-2">Explore our collection of exquisite fragrances.</p>
        </div>

        <div className="md:hidden mb-4">
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-headline">Filters</SheetTitle>
              </SheetHeader>
              <FiltersComponent />
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="hidden md:block md:w-1/4 lg:w-1/5 space-y-6 sticky top-20 self-start h-[calc(100vh-10rem)] overflow-y-auto pr-4">
            <h2 className="text-2xl font-semibold font-headline">Filters</h2>
            <FiltersComponent />
          </aside>

          <main className="md:w-3/4 lg:w-4/5">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-lg col-span-full">No products match your criteria.</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
