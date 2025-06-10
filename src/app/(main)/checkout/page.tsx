'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

// Placeholder for cart items and total, ideally from a global state or props
const mockCartSummary = {
  subtotal: 185.00,
  tax: 14.80,
  total: 199.80,
  items: [
    { id: '1', name: 'Mystique Bloom', quantity: 1, price: 120 },
    { id: '2', name: 'Ocean Whisper', quantity: 1, price: 95 },
  ]
};


export default function CheckoutPage() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, process payment and create order
    toast({
      title: 'Order Placed!',
      description: 'Thank you for your purchase. Your order is being processed.',
      variant: 'default',
    });
    // Potentially redirect to an order confirmation page
    // router.push('/order-confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-center">Checkout</h1>
      
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="font-headline">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Perfume Lane" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Scentville" required />
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" placeholder="FL" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" placeholder="12345" required />
                  </div>
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Payment Details</CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="•••• •••• •••• ••••" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              Place Order
            </Button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {mockCartSummary.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                       <span className="font-medium mr-2">{item.quantity}x</span>
                       <span>{item.name}</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${mockCartSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${mockCartSummary.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${mockCartSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
                <Link href="/cart" className="text-sm text-interactive-blue hover:underline w-full text-center">
                    Edit Cart
                </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
