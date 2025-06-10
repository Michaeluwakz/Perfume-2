import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-primary/30 via-background to-secondary/30 py-20 md:py-32">
      <div className="container mx-auto px-4 grid md:grid-cols-2 items-center gap-8">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 leading-tight">
            Discover Your Signature Scent
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8">
            Explore our exquisite collection of perfumes and find the one that truly defines you.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform hover:scale-105" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
        <div className="relative h-64 md:h-96">
           <Image
            src="https://i.ibb.co/Ng57YShx/image.png"
            alt="Perfume bottles showcase"
            fill
            priority
            className="object-contain rounded-lg shadow-2xl"
            data-ai-hint="perfume display"
          />
        </div>
      </div>
    </section>
  );
}
