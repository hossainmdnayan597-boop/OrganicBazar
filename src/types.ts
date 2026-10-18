export interface Product {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'oil-ghee' | 'honey' | 'sweets' | 'nuts-spices' | 'others';
  price: number;
  originalPrice: number;
  weight: string;
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockQuantity: number;
  description: string;
  features: string[];
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  zone: 'inside_dhaka' | 'outside_dhaka';
  deliveryFee: number;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    weight: string;
  }[];
  subtotal: number;
  total: number;
  paymentMethod: 'cod' | 'bkash';
  notes?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  productName: string;
  date: string;
  verified: boolean;
  avatar?: string;
}
