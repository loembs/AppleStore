// =============================================
// IMPLÉMENTATION SUPABASE
// =============================================

import { productServiceSupabase } from '@/services/product.service.supabase'
import { orderServiceSupabase } from '@/services/order.service.supabase'
import { cartService as supabaseCartService } from '@/lib/supabase'

import { authService as supabaseAuthService } from '@/services/auth.service'

import type { 
  IProductService, 
  ICartService, 
  IOrderService, 
  IAuthService 
} from './types'

export const supabaseProductProvider: IProductService = {
  getCategories: () => productServiceSupabase.getCategories(),
  getProducts: (categoryId?: number) => productServiceSupabase.getProducts(categoryId),
  getProduct: (id: string) => productServiceSupabase.getProduct(id),
  getFeaturedProducts: () => productServiceSupabase.getFeaturedProducts(),
  getNewProducts: () => productServiceSupabase.getNewProducts(),
  getBestsellers: () => productServiceSupabase.getBestsellers(),
  searchProducts: (query: string) => productServiceSupabase.searchProducts(query),
  getProductColors: (productId: string) => productServiceSupabase.getProductColors(productId),
  getProductStorage: (productId: string) => productServiceSupabase.getProductStorage(productId),
  getProductFeatures: (productId: string) => productServiceSupabase.getProductFeatures(productId),
  getProductSpecs: (productId: string) => productServiceSupabase.getProductSpecs(productId),
  getProductImages: (productId: string) => productServiceSupabase.getProductImages(productId),
  calculateProductPrice: (productId: string, colorId?: number, storageId?: number) =>
    productServiceSupabase.calculateProductPrice(productId, colorId, storageId),
  trackProductView: (productId: string, sessionId?: string) =>
    productServiceSupabase.trackProductView(productId, sessionId)
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
    orderServiceSupabase.createOrder(items, shippingAddress, paymentMethod, notes),
  getUserOrders: () => orderServiceSupabase.getUserOrders(),
  getOrder: (orderId: number) => orderServiceSupabase.getOrder(orderId)
}

export const supabaseAuthProvider: IAuthService = {
  signIn: (email: string, password: string) => supabaseAuthService.signIn(email, password),
  signUp: (email: string, password: string, userData) => supabaseAuthService.signUp(email, password, userData),
  signOut: () => supabaseAuthService.signOut(),
  getCurrentUser: () => supabaseAuthService.getCurrentUser(),
  onAuthStateChange: (callback) => supabaseAuthService.onAuthStateChange(callback),
  signInWithGoogle: (returnUrl?: string) => supabaseAuthService.signInWithGoogle(returnUrl)
}

