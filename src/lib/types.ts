export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
  fragranceFamily: string;
  description: string;
  stock: number;
  reviews?: Review[];
  category?: 'Bestsellers' | 'New Arrivals' | 'Seasonal Picks' | 'All';
  dataAiHint?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1-5 stars
  comment: string;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Collection {
  name: 'Bestsellers' | 'New Arrivals' | 'Seasonal Picks';
  description?: string;
  products: Product[];
}
