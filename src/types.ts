export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  specifications: string[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  verificationBadge: boolean;
}

export interface Category {
  id: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  tag: string;
}
