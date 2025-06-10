
import type { Product } from '@/lib/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'ROSE TONNERRE',
    price: 120,
    imageUrl: 'https://i.ibb.co/Vs4pLMm/image.png', 
    dataAiHint: 'classic elegant', 
    brand: 'Chanel',
    fragranceFamily: 'Floral',
    description: 'An enchanting floral bouquet with notes of jasmine, rose, and a hint of mystery. Perfect for evening wear.',
    stock: 15,
    category: 'Bestsellers',
    reviews: [
      { id: 'r1', productId: '1', author: 'Alice', rating: 5, comment: 'Absolutely captivating! My new favorite.', date: '2024-05-10' },
      { id: 'r2', productId: '1', author: 'Bob', rating: 4, comment: 'Lovely scent, very elegant.', date: '2024-05-12' },
    ]
  },
  {
    id: '2',
    name: 'Elysium', 
    price: 95,
    imageUrl: 'https://i.ibb.co/bRj75jFX/image.png', 
    dataAiHint: 'modern aquatic', 
    brand: 'Dior',
    fragranceFamily: 'Aquatic',
    description: 'A fresh and invigorating aquatic scent with notes of sea salt, bergamot, and cedarwood. Ideal for daytime.',
    stock: 25,
    category: 'New Arrivals',
    reviews: [
      { id: 'r3', productId: '2', author: 'Carol', rating: 5, comment: 'So refreshing and clean!', date: '2024-05-15' },
    ]
  },
  {
    id: '3',
    name: 'Gilded Bloom', 
    price: 150,
    imageUrl: 'https://i.ibb.co/GvVRwC8G/image.png', 
    dataAiHint: 'rose floral gold', 
    brand: 'Tom Ford',
    fragranceFamily: 'Oriental',
    description: 'A rich and opulent oriental fragrance featuring oud, amber, and spices. For those who love a bold statement.',
    stock: 10,
    category: 'Seasonal Picks',
     reviews: [
      { id: 'r4', productId: '3', author: 'David', rating: 5, comment: 'Powerful and long-lasting. True luxury.', date: '2024-04-20' },
    ]
  },
  {
    id: '4',
    name: 'Louis Vuitton', 
    price: 80,
    imageUrl: 'https://i.ibb.co/nsZfwBZm/image.png', 
    dataAiHint: 'dark mysterious luxury', 
    brand: 'Jo Malone',
    fragranceFamily: 'Citrus',
    description: 'A vibrant and zesty citrus explosion with grapefruit, lime, and basil. Uplifting and energetic.',
    stock: 30,
    category: 'Bestsellers',
  },
  {
    id: '5',
    name: 'Amber Dusk', 
    price: 110,
    imageUrl: 'https://i.ibb.co/sJ1JWhpH/image.png', 
    dataAiHint: 'golden warm amber', 
    brand: 'Yves Saint Laurent',
    fragranceFamily: 'Spicy',
    description: 'A warm and inviting spicy aroma with cinnamon, clove, and vanilla. Perfect for cozy evenings.',
    stock: 18,
    category: 'Seasonal Picks',
  },
  {
    id: '6',
    name: 'Crystal Sheer', 
    price: 130,
    imageUrl: 'https://i.ibb.co/8Lq4wXJ7/image.png', 
    dataAiHint: 'clear minimalist crystal', 
    brand: 'Gucci',
    fragranceFamily: 'Musk',
    description: 'A soft and sensual musk fragrance, delicate and clean with a powdery finish. Subtly alluring.',
    stock: 22,
    category: 'New Arrivals',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  if (category === 'All') return mockProducts;
  return mockProducts.filter(product => product.category === category);
};

