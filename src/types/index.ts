export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  club: string;
  clubAr: string;
  player?: string;
  playerAr?: string;
  league: string;
  leagueAr: string;
  season: string;
  kitType: 'home' | 'away' | 'third';
  category: 'shirt' | 'full_kit';
  basePrice: number;
  images: ProductImage[];
  variants: ProductVariant[];
  featured: boolean;
  createdAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  stock: number;
  price: number;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Order {
  id: string;
  ref: string;
  items: OrderItem[];
  customer: CustomerInfo;
  shippingAddress: ShippingAddress;
  paymentMethod: 'cash' | 'bit';
  notes?: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
}

export type OrderStatus = 'new' | 'contacted' | 'shipped' | 'completed' | 'canceled';

export interface OrderItem {
  productId: string;
  productName: string;
  productNameAr: string;
  size: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
}

export interface ShippingAddress {
  city: string;
  street: string;
  building: string;
  apartment?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  token: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

export interface ProductFilters {
  club?: string;
  player?: string;
  league?: string;
  kitType?: 'home' | 'away' | 'third';
  category?: 'shirt' | 'full_kit';
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sort?: 'popularity' | 'newest' | 'price_asc' | 'price_desc';
  page?: number;
  limit?: number;
}
