// =============================================
// TYPES COMMUNS POUR LES PROVIDERS
// =============================================

import type { Product, Category, CartItem, ProductColor, ProductStorage, ProductFeature, ProductSpecs, ProductImages } from '@/lib/supabase'

export interface IProductService {
  // Catégories
  getCategories(): Promise<Category[]>

  // Produits
  getProducts(categoryId?: number): Promise<Product[]>
  getProduct(id: string): Promise<Product | null>
  getFeaturedProducts(): Promise<Product[]>
  getNewProducts(): Promise<Product[]>
  getBestsellers(): Promise<Product[]>
  searchProducts(query: string): Promise<Product[]>

  // Détails produits
  getProductColors(productId: string): Promise<ProductColor[]>
  getProductStorage(productId: string): Promise<ProductStorage[]>
  getProductFeatures(productId: string): Promise<ProductFeature[]>
  getProductSpecs(productId: string): Promise<ProductSpecs[]>
  getProductImages(productId: string): Promise<ProductImages[]>

  // Utilitaires
  calculateProductPrice(productId: string, colorId?: number, storageId?: number): Promise<number>
  trackProductView(productId: string, sessionId?: string): Promise<void>
}

export interface ICartService {
  getCart(): Promise<CartItem[]>
  addToCart(productId: string, quantity: number, colorId?: number, storageId?: number): Promise<void>
  updateCartItemQuantity(itemId: number, quantity: number): Promise<void>
  removeFromCart(itemId: number): Promise<void>
  clearCart(): Promise<void>
}

export interface IOrderService {
  createOrder(
    items: Array<{
      product_id: string
      color_id?: number
      storage_id?: number
      quantity: number
    }>,
    shippingAddress: {
      first_name: string
      last_name: string
      address: string
      city: string
      postal_code?: string
      country: string
      phone: string
    },
    paymentMethod: string,
    notes?: string
  ): Promise<{ order_id: number; order_number: string; total_amount: number }>
  
  getUserOrders(): Promise<any[]>
  getOrder(orderId: number): Promise<any>
}

export interface IAuthService {
  signIn(email: string, password: string): Promise<any>
  signUp(email: string, password: string, userData: {
    first_name: string
    last_name: string
  }): Promise<any>
  signOut(): Promise<void>
  getCurrentUser(): Promise<any>
  onAuthStateChange(callback: (user: any) => void): { data: { subscription: { unsubscribe: () => void } } }
  signInWithGoogle(returnUrl?: string): Promise<any>
}

