// =============================================
// IMPLÉMENTATION JAVA BACKEND
// =============================================

import { JAVA_BACKEND_URL, JAVA_BACKEND_BASE_URL } from '@/config/provider.config'

import type { 
  IProductService, 
  ICartService, 
  IOrderService, 
  IAuthService
} from './types'


import type {
  Product,
  Category,
  CartItem,
  ProductColor,
  ProductStorage,
  ProductFeature,
  ProductSpecs,
  ProductImages
} from '@/lib/supabase'

// Helper pour récupérer le token d'authentification
const getAuthToken = (): string | null => {
  // Essayer d'abord 'token' (utilisé par authService)
  const token = localStorage.getItem('token')
  if (token) return token
  
  // Sinon essayer 'auth_token' (utilisé par javaBackendAuthProvider)
  return localStorage.getItem('auth_token')
}

// Helper pour les appels API avec authentification
const apiCall = async (endpoint: string, options?: RequestInit) => {
  const token = getAuthToken()
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers
  }

  const response = await fetch(`${JAVA_BACKEND_URL}${endpoint}`, {
    ...options,
    headers
  })

  if (!response.ok) {
    let errorMessage = `API Error: ${response.statusText}`
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorData.error || errorMessage
    } catch {
      // Ignorer si on ne peut pas parser l'erreur
    }
    throw new Error(errorMessage)
  }

  const data = await response.json()
  
  // Si la réponse est déjà dans le format ApiResponse, extraire data
  if (data && typeof data === 'object' && 'data' in data && 'success' in data) {
    return data.data
  }
  
  return data
}

// Mapper les données du backend Java vers le format frontend
const mapProduct = (product: any): Product => ({
  id: String(product.id),
  name: product.name,
  tagline: product.tagline || null,
  price: product.price,
  image: product.image || null,
  categoryid: product.category?.id || 0,
  stock: 100, // TODO: ajouter stock dans le backend
  available: true,
  is_featured: product.isFeatured || false,
  is_new: product.isNew || false,
  is_bestseller: product.isBestseller || false,
  rating: 0,
  review_count: 0,
  view_count: 0,
  total_sales: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
})

export const javaBackendProductProvider: IProductService = {
  async getCategories(): Promise<Category[]> {
    const data = await apiCall('/api/categories')
    return Array.isArray(data) ? data.map((cat: any) => ({
      id: cat.id,
      libelle: cat.libelle || cat.name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })) : []
  },

  async getProducts(categoryId?: number): Promise<Product[]> {
    const endpoint = categoryId 
      ? `/api/products/category/${categoryId}`
      : '/api/products'
    const data = await apiCall(endpoint)
    return Array.isArray(data) ? data.map(mapProduct) : []
  },

  async getProduct(id: string): Promise<Product | null> {
    const data = await apiCall(`/api/products/${id}`)
    return data ? mapProduct(data) : null
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const data = await apiCall('/api/products/featured')
    return Array.isArray(data) ? data.map(mapProduct) : []
  },

  async getNewProducts(): Promise<Product[]> {
    const data = await apiCall('/api/products/new')
    return Array.isArray(data) ? data.map(mapProduct) : []
  },

  async getBestsellers(): Promise<Product[]> {
    const data = await apiCall('/api/products/bestsellers')
    return Array.isArray(data) ? data.map(mapProduct) : []
  },

  async searchProducts(query: string): Promise<Product[]> {
    const data = await apiCall(`/api/products/search?q=${encodeURIComponent(query)}`)
    return Array.isArray(data) ? data.map(mapProduct) : []
  },

  async getProductColors(productId: string): Promise<ProductColor[]> {
    const data = await apiCall(`/api/products/${productId}/colors`)
    return Array.isArray(data) ? data.map((color: any) => ({
      id: color.id,
      product_id: productId,
      name: color.name,
      hex: color.hex || null,
      code: color.code || null,
      image: color.image || null,
      price_adjustment: color.priceAdjustment || 0,
      available: color.available !== false,
      created_at: new Date().toISOString()
    })) : []
  },

  async getProductStorage(productId: string): Promise<ProductStorage[]> {
    const data = await apiCall(`/api/products/${productId}/storage`)
    return Array.isArray(data) ? data.map((storage: any) => ({
      id: storage.id,
      product_id: productId,
      size: storage.size,
      price: storage.price,
      available: storage.available !== false,
      created_at: new Date().toISOString()
    })) : []
  },

  async getProductFeatures(productId: string): Promise<ProductFeature[]> {
    const data = await apiCall(`/api/products/${productId}/features`)
    return Array.isArray(data) ? data.map((feature: any, index: number) => ({
      id: feature.id || index,
      product_id: productId,
      feature: feature.feature || feature.name,
      created_at: new Date().toISOString()
    })) : []
  },

  async getProductSpecs(productId: string): Promise<ProductSpecs[]> {
    const data = await apiCall(`/api/products/${productId}/specs`)
    return Array.isArray(data) ? data.map((spec: any) => ({
      id: spec.id,
      product_id: productId,
      spec_name: spec.specName || spec.name,
      spec_value: spec.specValue || spec.value,
      created_at: new Date().toISOString()
    })) : []
  },

  async getProductImages(productId: string): Promise<ProductImages[]> {
    // Le backend Java peut retourner une liste d'images
    // Pour l'instant, on retourne l'image principale
    const product = await this.getProduct(productId)
    if (!product || !product.image) return []
    
    return [{
      id: 1,
      product_id: productId,
      image_url: product.image,
      alt_text: product.name,
      display_order: 1,
      is_hero: true,
      created_at: new Date().toISOString()
    }]
  },

  async calculateProductPrice(productId: string, colorId?: number, storageId?: number): Promise<number> {
    const product = await this.getProduct(productId)
    if (!product) return 0

    let price = product.price

    if (colorId) {
      const colors = await this.getProductColors(productId)
      const color = colors.find(c => c.id === colorId)
      if (color) price += (color.price_adjustment || 0)
    }

    if (storageId) {
      const storage = await this.getProductStorage(productId)
      const storageOption = storage.find(s => s.id === storageId)
      if (storageOption) price = storageOption.price
    }

    return price
  },

  async trackProductView(productId: string, sessionId?: string): Promise<void> {
    try {
      await apiCall(`/api/products/${productId}/track-view`, {
        method: 'POST',
        body: JSON.stringify({ sessionId })
      })
    } catch (error) {
      // Ignorer les erreurs de tracking
      console.warn('Product view tracking failed:', error)
    }
  }
}

export const javaBackendCartProvider: ICartService = {
  async getCart(): Promise<CartItem[]> {
    try {
      const cartResponse = await apiCall('/api/cart')
      
      // Le backend retourne CartResponse avec items, total, itemCount
      if (cartResponse && cartResponse.items) {
        return cartResponse.items.map((item: any) => ({
          id: item.id,
          product_id: String(item.product?.id || item.productId),
          product: item.product ? mapProduct(item.product) : null,
          quantity: item.quantity,
          price: item.unitPrice || item.totalPrice || item.price || item.product?.price || 0,
          color_id: item.colorId,
          storage_id: item.storageId,
          created_at: item.addedAt || item.createdAt || new Date().toISOString()
        }))
      }
      
      return []
    } catch (error) {
      // Si non authentifié, retourner un panier vide
      if (error instanceof Error && error.message.includes('403')) {
        return []
      }
      throw error
    }
  },

  async addToCart(productId: string, quantity: number, colorId?: number, storageId?: number): Promise<void> {
    await apiCall('/api/cart/items', {
      method: 'POST',
      body: JSON.stringify({ 
        productId: productId, // Backend attend String
        quantity, 
        colorId: colorId || null, 
        storageId: storageId || null
      })
    })
  },

  async updateCartItemQuantity(itemId: number, quantity: number): Promise<void> {
    await apiCall(`/api/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    })
  },

  async removeFromCart(itemId: number): Promise<void> {
    await apiCall(`/api/cart/items/${itemId}`, {
      method: 'DELETE'
    })
  },

  async clearCart(): Promise<void> {
    await apiCall('/api/cart', {
      method: 'DELETE'
    })
  }
}

export const javaBackendOrderProvider: IOrderService = {
  async createOrder(items, shippingAddress, paymentMethod, notes) {
    // Mapper les items au format backend
    const orderItems = items.map((item: any) => ({
      productId: String(item.product_id || item.productId),
      quantity: item.quantity,
      price: item.price,
      colorId: item.color_id || item.colorId || null,
      storageId: item.storage_id || item.storageId || null
    }))

    // Récupérer l'utilisateur actuel pour l'email
    const userStr = localStorage.getItem('user')
    const user = userStr ? JSON.parse(userStr) : null

    const data = await apiCall('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        items: orderItems,
        shippingAddress: {
          firstName: shippingAddress.first_name || user?.firstName || '',
          lastName: shippingAddress.last_name || user?.lastName || '',
          email: user?.email || '',
          phone: shippingAddress.phone || user?.phone || '',
          address: shippingAddress.address || '',
          city: shippingAddress.city || '',
          postalCode: shippingAddress.postal_code || '',
          country: shippingAddress.country || 'Senegal'
        },
        paymentMethod: paymentMethod || 'CARD',
        notes: notes || ''
      })
    })
    
    return {
      order_id: data.id,
      order_number: data.orderNumber || String(data.id),
      total_amount: data.totalAmount || data.total || 0
    }
  },

  async getUserOrders() {
    const data = await apiCall('/api/orders')
    // Le backend retourne ApiResponse<PaginatedResponse<OrderResponse>>
    // ou directement PaginatedResponse
    if (data && data.content) {
      return data.content // PaginatedResponse
    }
    if (Array.isArray(data)) {
      return data
    }
    return []
  },

  async getOrder(orderId: number) {
    return apiCall(`/api/orders/${orderId}`)
  }
}

export const javaBackendAuthProvider: IAuthService = {
  async signIn(email: string, password: string) {
    const data = await apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    
    // Stocker le token dans les deux formats pour compatibilité
    if (data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('auth_token', data.token)
      
      // Stocker l'utilisateur
      if (data.user) {
        localStorage.setItem('user', JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.nomcomplet?.split(' ')[0] || '',
          lastName: data.user.nomcomplet?.split(' ').slice(1).join(' ') || '',
          phone: data.user.phone,
          address: data.user.address,
          role: data.user.role || 'CLIENT',
          isActive: data.user.enabled !== false,
          createdAt: data.user.createdAt,
          updatedAt: data.user.lastLogin || data.user.createdAt
        }))
      }
      
      // Déclencher l'événement de connexion
      window.dispatchEvent(new CustomEvent('userLoggedIn'))
    }
    
    return data
  },

  async signUp(email: string, password: string, userData) {
    const data = await apiCall('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ 
        email, 
        password,
        nomcomplet: userData.first_name && userData.last_name 
          ? `${userData.first_name} ${userData.last_name}` 
          : userData.first_name || userData.last_name || email,
        phone: '',
        address: ''
      })
    })
    
    // Stocker le token si présent
    if (data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('auth_token', data.token)
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.nomcomplet?.split(' ')[0] || '',
          lastName: data.user.nomcomplet?.split(' ').slice(1).join(' ') || '',
          phone: data.user.phone,
          address: data.user.address,
          role: data.user.role || 'CLIENT',
          isActive: data.user.enabled !== false,
          createdAt: data.user.createdAt,
          updatedAt: data.user.createdAt
        }))
      }
      
      window.dispatchEvent(new CustomEvent('userLoggedIn'))
    }
    
    return data
  },

  async signOut(): Promise<void> {
    try {
      await apiCall('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      // Ignorer les erreurs de logout
      console.warn('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.dispatchEvent(new CustomEvent('userLoggedOut'))
    }
  },

  async getCurrentUser() {
    const token = getAuthToken()
    if (!token) return null
    
    try {
      const response = await fetch(`${JAVA_BACKEND_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        if (response.status === 401 || response.status === 400) {
          localStorage.removeItem('token')
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user')
        }
        return null
      }

      const authResponse = await response.json()
      // Le backend retourne AuthResponse avec user à l'intérieur
      const userData = authResponse.user || authResponse
      
      // Mapper au format frontend
      const mappedUser = {
        id: userData.id,
        email: userData.email,
        firstName: userData.nomcomplet?.split(' ')[0] || '',
        lastName: userData.nomcomplet?.split(' ').slice(1).join(' ') || '',
        phone: userData.phone || '',
        address: userData.address || '',
        role: userData.role || 'CLIENT',
        isActive: userData.enabled !== false,
        createdAt: userData.createdAt,
        updatedAt: userData.lastLogin || userData.createdAt
      }

      // Stocker l'utilisateur mappé
      localStorage.setItem('user', JSON.stringify(mappedUser))
      
      return mappedUser
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  },

  onAuthStateChange(callback: (user: any) => void) {
    // Vérifier l'utilisateur au démarrage
    const checkUser = async () => {
      const user = await this.getCurrentUser()
      callback(user)
    }
    checkUser()
    
    // Écouter les événements de connexion/déconnexion
    const handleLogin = () => checkUser()
    const handleLogout = () => callback(null)
    
    window.addEventListener('userLoggedIn', handleLogin)
    window.addEventListener('userLoggedOut', handleLogout)
    
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            window.removeEventListener('userLoggedIn', handleLogin)
            window.removeEventListener('userLoggedOut', handleLogout)
          }
        }
      }
    }
  },

  async signInWithGoogle(returnUrl?: string) {
    // Spring Security OAuth2 utilise /oauth2/authorization/google
    // On stocke le returnUrl dans sessionStorage pour le récupérer après
    if (returnUrl) {
      sessionStorage.setItem('oauth_return_url', returnUrl)
    }
    
    // Rediriger vers l'endpoint OAuth2 de Spring Security
    const redirectUrl = `${JAVA_BACKEND_BASE_URL}/oauth2/authorization/google`
    window.location.href = redirectUrl
  }
}

