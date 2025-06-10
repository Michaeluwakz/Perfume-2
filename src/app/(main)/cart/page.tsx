'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { CartItem } from '@/lib/types';
import { mockProducts } from '@/data/products'; // For mock data
import { X, Plus, Minus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// In a real app, this would come from a cart context/store
const initialCartItems: CartItem[] = mockProducts.slice(0, 2).map(p => ({ ...p, quantity: Math.floor(Math.random() * 3) + 1 }));

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prevItems => 
      prevItems.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // Example tax rate
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold font-headline mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-center">Your Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map(item => (
            <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 gap-4">
              <div className="relative w-24 h-32 sm:w-20 sm:h-28 rounded overflow-hidden shrink-0">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={item.dataAiHint || 'perfume bottle'}/>
              </div>
              <div className="flex-grow text-center sm:text-left">
                <Link href={`/products/${item.id}`} className="hover:text-primary">
                  <h2 className="text-lg font-semibold font-headline">{item.name}</h2>
                </Link>
                <p className="text-sm text-muted-foreground">{item.brand}</p>
                <p className="text-md font-semibold text-primary">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2 my-2 sm:my-0">
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 text-center h-9"
                  min="1"
                />
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-lg font-semibold w-24 text-center sm:text-right">${(item.price * item.quantity).toFixed(2)}</p>
              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive/80">
                <X className="h-5 w-5" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Minimalist ShoppingCart icon
const ShoppingCart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);
