import Link from 'next/link';
import { PackageOpen, ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <PackageOpen className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl text-primary">The Perfume Shop</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4">
          <Link href="/" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">
            Products
          </Link>
          <Link href="/scent-profiler" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary flex items-center">
            <Sparkles className="mr-1 h-4 w-4 text-accent" />
            AI Scent Profiler
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
