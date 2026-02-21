import type { Product, Order, ProductFilters, ApiResponse, PaginatedResponse, AdminUser } from '@/types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('admin_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}

// Products
export const productsApi = {
  getAll: (filters?: ProductFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== '') params.set(k, String(v));
      });
    }
    const qs = params.toString();
    return request<PaginatedResponse<Product>>(`/products${qs ? `?${qs}` : ''}`);
  },
  getById: (id: string) => request<ApiResponse<Product>>(`/products/${id}`),
  create: (data: FormData) =>
    request<ApiResponse<Product>>('/admin/products', {
      method: 'POST',
      headers: {},
      body: data,
    }),
  update: (id: string, data: FormData) =>
    request<ApiResponse<Product>>(`/admin/products/${id}`, {
      method: 'PUT',
      headers: {},
      body: data,
    }),
  delete: (id: string) =>
    request<ApiResponse<void>>(`/admin/products/${id}`, { method: 'DELETE' }),
};

// Orders
export const ordersApi = {
  create: (data: {
    items: { variantId: string; quantity: number }[];
    customer: { fullName: string; phone: string; email?: string };
    shippingAddress: { city: string; street: string; building: string; apartment?: string };
    paymentMethod: 'cash' | 'bit';
    notes?: string;
  }) =>
    request<ApiResponse<Order>>('/orders', { method: 'POST', body: JSON.stringify(data) }),

  getAll: (params?: { status?: string; search?: string; page?: number }) => {
    const qs = new URLSearchParams();
    if (params) Object.entries(params).forEach(([k, v]) => { if (v) qs.set(k, String(v)); });
    return request<PaginatedResponse<Order>>(`/admin/orders?${qs}`);
  },
  getById: (id: string) => request<ApiResponse<Order>>(`/admin/orders/${id}`),
  updateStatus: (id: string, status: string) =>
    request<ApiResponse<Order>>(`/admin/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// Auth
export const authApi = {
  login: (username: string, password: string) =>
    request<ApiResponse<AdminUser>>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
};
