// =============================================
// IMPLÉMENTATION SUPABASE
// =============================================

import { 
  productService as supabaseProductService,
  cartService as supabaseCartService,
  orderService as supabaseOrderService
} from '@/lib/supabase'

import { authService as supabaseAuthService } from '@/services/auth.service'

import type { 
  IProductService, 
  ICartService, 
  IOrderService, 
  IAuthService 
} from './types'

export const supabaseProductProvider: IProductService = {
  getCategories: () => supabaseProductService.getCategories(),
  getProducts: (categoryId?: number) => supabaseProductService.getProducts(categoryId),
  getProduct: (id: string) => supabaseProductService.getProduct(id),
  getFeaturedProducts: () => supabaseProductService.getFeaturedProducts(),
  getNewProducts: () => supabaseProductService.getNewProducts(),
  getBestsellers: () => supabaseProductService.getBestsellers(),
  searchProducts: (query: string) => supabaseProductService.searchProducts(query),
  getProductColors: (productId: string) => supabaseProductService.getProductColors(productId),
  getProductStorage: (productId: string) => supabaseProductService.getProductStorage(productId),
  getProductFeatures: (productId: string) => supabaseProductService.getProductFeatures(productId),
  getProductSpecs: (productId: string) => supabaseProductService.getProductSpecs(productId),
  getProductImages: (productId: string) => supabaseProductService.getProductImages(productId),
  calculateProductPrice: (productId: string, colorId?: number, storageId?: number) => 
    supabaseProductService.calculateProductPrice(productId, colorId, storageId),
  trackProductView: (productId: string, sessionId?: string) => 
    supabaseProductService.trackProductView(productId, sessionId)
}

export const supabaseCartProvider: ICartService = {
  getCart: () => supabaseCartService.getCart(),
  addToCart: (productId: string, quantity: number, colorId?: number, storageId?: number) => 
    supabaseCartService.addToCart(productId, quantity, colorId, storageId),
  updateCartItemQuantity: (itemId: number, quantity: number) => 
    supabaseCartService.updateCartItemQuantity(itemId, quantity),
  removeFromCart: (itemId: number) => supabaseCartService.removeFromCart(itemId),
  clearCart: () => supabaseCartService.clearCart()
}

export const supabaseOrderProvider: IOrderService = {
  createOrder: (items, shippingAddress, paymentMethod, notes) => 
    supabaseOrderService.createOrder(items, shippingAddress, paymentMethod, notes),
  getUserOrders: () => supabaseOrderService.getUserOrders(),
  getOrder: (orderId: number) => supabaseOrderService.getOrder(orderId)
}

export const supabaseAuthProvider: IAuthService = {
  signIn: (email: string, password: string) => supabaseAuthService.signIn(email, password),
  signUp: (email: string, password: string, userData) => supabaseAuthService.signUp(email, password, userData),
  signOut: () => supabaseAuthService.signOut(),
  getCurrentUser: () => supabaseAuthService.getCurrentUser(),
  onAuthStateChange: (callback) => supabaseAuthService.onAuthStateChange(callback),
  signInWithGoogle: (returnUrl?: string) => supabaseAuthService.signInWithGoogle(returnUrl)
}

